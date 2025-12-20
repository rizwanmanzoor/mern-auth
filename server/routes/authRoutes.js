import express from "express";
import userAuth from "../middleware/userAuth.js";
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenicated, sendResetPasswordOtp, verifyResetOtp, resetPassword } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenicated);

authRouter.post("/send-reset-otp", sendResetPasswordOtp);
authRouter.post("/verify-reset-otp", verifyResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;