<<<<<<< HEAD
import Router from "express";
import { logginIn, passwordResetRequest, passwordReset, logout } from "../Controllers/authApis/authController.js";
import { authMiddleware, adminMiddleware, altimateAdminMiddleware } from "../Middlewares/authMiddleware.js";


const authRouter = Router();

//get all users

authRouter
//post
.post("/user/login", logginIn)

.post('/pasword/resetRequest', passwordResetRequest)
.post('/pasword/reset', passwordReset)

// POST
.post("/user/logout", logout)

// Example: Route only Admin can access
.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome Admin" });
})

// Example: Route only Altimate Admin can access
.get("/altimate/dashboard", authMiddleware, altimateAdminMiddleware, (req, res) => {
    res.json({ message: "Welcome Altimate Admin" });
})


=======
import Router from "express";
import { logginIn, passwordResetRequest, passwordReset, logout } from "../Controllers/authApis/authController.js";
import { authMiddleware, adminMiddleware, altimateAdminMiddleware } from "../Middlewares/authMiddleware.js";


const authRouter = Router();

//get all users

authRouter
//post
.post("/user/login", logginIn)

.post('/pasword/resetRequest', passwordResetRequest)
.post('/pasword/reset', passwordReset)

// POST
.post("/user/logout", logout)

// Example: Route only Admin can access
.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome Admin" });
})

// Example: Route only Altimate Admin can access
.get("/altimate/dashboard", authMiddleware, altimateAdminMiddleware, (req, res) => {
    res.json({ message: "Welcome Altimate Admin" });
})


>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
export default authRouter