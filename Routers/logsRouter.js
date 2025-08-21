<<<<<<< HEAD
import express from "express";
import { viewLogs } from "../Controllers/logsApis/logsController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { altimateAdminMiddleware } from "../Middlewares/roleMiddleware.js";


const router = express.Router();

// Only altimateAdmin can access this
router.get("/system/logs", authMiddleware, altimateAdminMiddleware, viewLogs);

=======
import express from "express";
import { viewLogs } from "../Controllers/logsApis/logsController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { altimateAdminMiddleware } from "../Middlewares/roleMiddleware.js";


const router = express.Router();

// Only altimateAdmin can access this
router.get("/system/logs", authMiddleware, altimateAdminMiddleware, viewLogs);

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
export default router;