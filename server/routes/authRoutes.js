import express from "express";
import userAuth from "../middleware/userAuth.js";
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenicated } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenicated);

export default authRouter;