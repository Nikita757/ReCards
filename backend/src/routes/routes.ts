import express from "express";
import cors from "cors";
import {
  login,
  logout,
  register,
  dashboard,
  createDeck,
  createCard,
} from "../controllers/controllers";

export const userRouter = express.Router();

const CorsOptions = {
  origin: "https://recards.gotsreact.com",
  credentials: true,
  allowedHeaders: [
    "Cookie",
    "Content-Type",
    "X-Requested-With",
    "X-HTTP-Method-Override",
    "Accept",
  ],
  exposedHeaders: "Set-Cookie",
};

userRouter.use(cors(CorsOptions));

userRouter.post("/login", login);

userRouter.post("/register", register);

userRouter.post("/logout", logout);

userRouter.get("/dashboard", dashboard);

userRouter.post("/createDeck", createDeck);

userRouter.post("/createCard", createCard);

export default userRouter;
