import express from "express";
import { customValidators, createResponse } from "../utils/helper.js";
import User from "../models/users.js";

const SECRET_KEY = "APPLICATION";
const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValidatated = customValidators(req, "LOGIN");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    let isRegisteredUser = await User.findOne({ email: email });
    if (!isRegisteredUser) {
      throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isRegisteredUser.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ _id: isRegisteredUser._id }, SECRET_KEY, {
      expiresIn: "2d",
    });
    res.cookie("token", token);
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
    const { firstName, lastName, email, password, age, about } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
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
  res.clearCookie("token");
  res.json({
    statusCode: 200,
    message: "Loged Out successfully",
    error: "",
  });
});

authRouter.post("/forget-password", async (req, res, next) => {
  try {
    const { password } = req.body;
    const { email } = req.params;
    const isValidatated = customValidators(req, "FORGET_PASSWORD");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    const user = await User.findOne({ email: email });
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
