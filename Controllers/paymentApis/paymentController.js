import { stripe } from "../../utils/stripe.js";
import Cart from "../../Models/cartSchema.js";
import Product from "../../Models/productSchema.js";
import Order from "../../Models/orderSchema.js";

// Recalculate cart total from DB to avoid client tampering
async function buildOrderFromCArt(userId) {
    const cart = await Cart.findOne({ userId}).populate("products.productId");
    if(!cart || !cart.products?.length) {
        const err = new Error("Cart is empty");
        err.status = 400;
        throw err;
    };

    const items = cart.products.map(p => {
        const unitPrice = Number(p.price);  // you already store price on cart line
        const qty = Number(p.quantity);
        return {
            productId: p.productId._id,
            name: p.productId.name || p.productId.title || "Product",
            price: unitPrice,
            quantity: qty,
            total: unitPrice * qty,
        };
    });

    const amount = items.reduce((s, it) => s + it.total, 0);
    return { items, amount, cart };
};


// POST /api/payment/checkout
export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.user._Id;
        const currency = (procees.env.CURRENCY || "usd").toLowerCase();

        const { items, amount, cart }  = await buildOrderFromCArt(userId);

 // Create a pending order
        const order = await Order.create({
        userId,
        items,
        amount,
        currency,
        status: "pending",
        });


        // Convert to Stripe line_items (unit_amount in the smallest unit)
        const line_items = items.map(it => ({
            quantity: it.quantity,
            price_data: {
                currency,
                Product_data: { name: it.name },
                unit_amount: Math.round(it.price * 100), // cents

            },
        }));


        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items,
            success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
            metadata: {
                userId: String(userId),
                orderId: String(order._id),
            },
        });

      // Store the Stripe session on the order
            order.stripeSessionId = session.id;
            await order.save();

     // Optional: Clear cart now or on success webhook. Typically on success.
            cart.products = []; cart.totalCartPrice = 0; await cart.save();

            res.status(200).json({ url: session.url, sessionId: session.id });
        } catch (err) {
            console.error(err);
            res.status(err.status || 500).json({ message: err.message || "Payment error" });
        }
};


// GET /api/payment/public-key  (optional helper for frontend)
export const getStripePublicKey = (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "" });
};



// POST /webhooks/stripe  (raw body required!)
export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,                                   // see server.js change!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata?.orderId;
      const paymentIntentId = session.payment_intent;

      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.status = "paid";
          order.paymentIntentId = paymentIntentId;
          await order.save();
        }
      }

      // Optionally clear cart after payment success
      const userId = session.metadata?.userId;
      if (userId) {
        const cart = await Cart.findOne({ userId });
        if (cart) {
          cart.products = [];
          cart.totalCartPrice = 0;
          await cart.save();
        }
      }
    }

    // Handle failures/cancellations if you want
    if (event.type === "checkout.session.expired" || event.type === "payment_intent.payment_failed") {
      // set order status to failed if you can map it
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).send("Webhook handler failure");
  }
};