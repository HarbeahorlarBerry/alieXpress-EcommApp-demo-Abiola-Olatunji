import express from "express";
import { viewLogs } from "../Controllers/logsApis/logsController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { altimateAdminMiddleware } from "../Middlewares/roleMiddleware.js";


const router = express.Router();

// Only altimateAdmin can access this
router.get("/system/logs", authMiddleware, altimateAdminMiddleware, viewLogs);

export default router;