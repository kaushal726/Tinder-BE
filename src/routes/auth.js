import express from "express";
import { customValidators, createResponse } from "../utils/helper.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";

const SECRET_KEY = "APPLICATION";
const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    const isValidatated = customValidators(req, "LOGIN");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    let isRegisteredUser = await User.findOne({ emailId: emailId });
    if (!isRegisteredUser) {
      throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await User.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }
    const token = await User.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    return createResponse(res, 200, "Login successful", { token });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/signup", async (req, res, next) => {
  try {
    const isValidatated = customValidators(req, "SIGNUP");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    const { firstName, lastName, emailId, password, age, about } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      about,
    });
    await user.save();
    return createResponse(res, 201, "User registered successfully");
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
  });
  // res.cookie("token",null,{
  //   expires: new Date(Date.now()),
  // })
  res.json({
    statusCode: 200,
    message: "Loged Out successfully",
    error: "",
  });
});

authRouter.post("/forget-password", async (req, res, next) => {
  try {
    const { password } = req.body;
    const { emailId } = req.params;
    const isValidatated = customValidators(req, "FORGET_PASSWORD");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return createResponse(res, 200, "Password reset successfully");
  } catch (error) {
    next(error);
  }
});

export default authRouter;
