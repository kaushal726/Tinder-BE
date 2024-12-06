import express from "express";
import { authValidator } from "../middlewares/auth.js";
import {
  forgotPassword,
  profileEdit,
  profileView,
} from "../controllers/profile.js";

const profileRouter = express.Router();

profileRouter.get("/view", authValidator, profileView);

profileRouter.patch("/edit", authValidator, profileEdit);

profileRouter.post("/forgot-password", forgotPassword);

export default profileRouter;
