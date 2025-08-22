import { mongoose, Schema, model} from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true  // unit price (e.g. 2000 for $20.00 if currency=usd → store in major units)
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true   // price * quantity (major units)
    }
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
        },
        items: [ orderItemSchema ],
        amount: {
            type: Number,
            required: true // cart total (major units)
        },
        currency: {
            type: String, 
            default: "usd"
        },
        status: {
            type: String,
            enum: [ "pending", "paid", "failed", "canceled"], default: "pending"
        },
        stripeSessionId: { 
            type: String 
        },
        PaymentIntentId: {
            type: String
        },
    },
    { timestamps: true }
);

const Order = model("Order",  orderSchema);

export default Order;