import express from "express";
import { customValidators, createResponse } from "../utils/helper.js";
import User from "../models/users.js";
import { authValidator } from "../middlewares/auth.js";
import bcrypt from "bcrypt";

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
    Object.keys(req.body).forEach((field) => (user[field] = req.body[field]));

    await user.save();
    createResponse(res, 200, "Profile updated successfully", user);
  } catch (error) { }
});

profileRouter.post(
  "/forgot-password",
  async (req, res, next) => {
    try {
      const { password } = req.body;
      const { emailId } = req.query.emailId;
      if ((emailId == "" && password == "") && (!validator.isStrongPassword(password) && !validator.isEmail(emailId))) {
        throw new Error("Invalid Fields");
      }
      const user = await User.find({ emailId: emailId });
      if (!user) {
        throw new Error("User not found");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const _user = await User.updateOne({ password: hashedPassword })
      if (_user.matchedCount === 0) {
        throw new Error("Failed to reset password");
      }
      return createResponse(res, 200, "Password reset successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default profileRouter;
