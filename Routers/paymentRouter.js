import express from "express";
import { createCheckoutSession, getStripePublicKey } from "../Controllers/paymentApis/paymentController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const paymentRouter = express.Router();



paymentRouter
// user must be authenticated to pay
.post("/checkout", authMiddleware, createCheckoutSession)

// optional helper
.get("/public-key", getStripePublicKey)

export default paymentRouter;