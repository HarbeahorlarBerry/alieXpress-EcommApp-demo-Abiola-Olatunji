<<<<<<< HEAD
import { Router } from "express";
import { verifyOTP, resendOTP } from "../Controllers/otpApis/verifyOTP.js";

const otpRouter = Router();

// get all users

otpRouter
.post("/verify", verifyOTP)
.post("/resend", resendOTP)

=======
import { Router } from "express";
import { verifyOTP, resendOTP } from "../Controllers/otpApis/verifyOTP.js";

const otpRouter = Router();

// get all users

otpRouter
.post("/verify", verifyOTP)
.post("/resend", resendOTP)

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
export default otpRouter;