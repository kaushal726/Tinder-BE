import express from "express";
import { customValidators, createResponse } from "../utils/helper.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import { authValidator } from "../middlewares/auth.js";

const SECRET_KEY = "APPLICATION";
const profileRouter = express.Router();

profileRouter.get("/view", authValidator, async (req, res, next) => {
  try {
    const user = req.user;
    createResponse(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
});

profileRouter.patch("/edit", authValidator, async (req, res, next) => {
  const user = req.user;
});
