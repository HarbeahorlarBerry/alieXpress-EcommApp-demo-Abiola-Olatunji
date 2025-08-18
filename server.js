import express, { urlencoded, json } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './MongoDb/mongoDb.js';
import usersRouters from './Routers/usersRouters.js';
import authRouter from './Routers/authRouter.js';
import cartRouter from './Routers/cartRouter.js';
import productRouter from './Routers/productRouter.js';
import uploadFileRouter from "./Routers/uploadFileRouter.js";
import otpRouter from './Routers/otpRouter.js';
import allApis from './Routers/allApis.js';
import cors from "cors";
import { startCleanUp } from './cronjobs/startCleanUp.js';
import logsRouter from './Routers/logsRouter.js';

dotenv.config(); // Load environment variables

const appServer = express();
const PORT = process.env.PORT || 9000;

// // ✅ 🔗 Connect to DB
connectDB();
// ✅ Start cleanup cronjob
startCleanUp();

// ✅ TOP-LEVEL MIDDLEWARES
appServer.use(cors());
appServer.use(urlencoded({ extended: true }));
appServer.use(json());
appServer.use(cookieParser()); // ❗️Call the function

// ✅ ROUTES
appServer.use("/api/users", usersRouters);
appServer.use("/api/auth", authRouter);
appServer.use("/api/products", productRouter); 
appServer.use("/api/cart", cartRouter);
appServer.use("/api/upload", uploadFileRouter);
appServer.use("/api/otp", otpRouter);
appServer.use("/api", logsRouter);
appServer.use("/", allApis);

// 🔹 404 Handler
appServer.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🔹 Global Error Handler
appServer.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ START SERVER
appServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
