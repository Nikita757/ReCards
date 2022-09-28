import express from "express";
import cors from "cors";
import { login, logout, dashboard } from "../controllers/controllers";

export const userRouter = express.Router();

const CorsOptions = {
  origin: "https://recards.gotsreact.com",
  credentials: true,
  allowedHeaders: "Cookie,Content-Type",
  exposedHeaders: "Set-Cookie",
};

userRouter.use(cors(CorsOptions));

userRouter.post("/login", login);

userRouter.get("/logout", logout);

userRouter.get("/", dashboard);

export default userRouter;
