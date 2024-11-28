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
  try {
    const user = req.user;
    const isValidatated = customValidators(req, "EDIT_PROFILE");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    const { firstName, lastName, emailId, age, about, skill } = req.body;
    Object.keys(req.body).forEach((field) => (user[field] = req.body[field]));

    await user.save();
    createResponse(res, 200, "Profile updated successfully", user);
  } catch (error) {}
});
