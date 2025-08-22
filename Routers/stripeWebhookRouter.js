import express from "express";
import Stripe, { Stripe } from "stripe";

const router = express.Router();
const Stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Stripe webhook route
router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // from your Stripe dashboard
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle event types
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("✅ Payment successful:", session);

      // 👉 Here you update your order in DB
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Payment failed");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send({ received: true });
});