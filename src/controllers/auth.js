import { createResponse, authSignUp, authLogin } from "../utils/helper.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    const isValidatated = authLogin(req, "LOGIN");

    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    let user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    return createResponse(res, 200, "Login successful", { token });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const isValidatated = authSignUp(req, "SIGNUP");
    if (!isValidatated) {
      throw new Error("Invalid Fields");
    }
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      about,
      gender,
      photoUrl,
      skill,
    } = req.body;
    const isEmailExist = await User.findOne({ emailId: emailId });
    if (isEmailExist) {
      throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      about,
      gender,
      photoUrl,
      skill,
    });
    await user.save();
    return createResponse(res, 201, "User registered successfully");
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    statusCode: 200,
    message: "Loged Out successfully",
    error: "",
  });
};

export { login, signup, logout };
