import express from "express";
import cors from "cors";
import { login, logout, dashboard } from "../controllers/controllers";

export const userRouter = express.Router();

const CorsOptions = {
  origin: "http://127.0.0.1:3000",
  credentials: true,
  allowedHeaders: "Cookie",
  exposedHeaders: "Set-Cookie",
};

userRouter.use(cors(CorsOptions));

userRouter.get("/login", login);

userRouter.get("/logout", logout);

userRouter.get("/", dashboard);

export default userRouter;
