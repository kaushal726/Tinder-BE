import { createResponse } from "../utils/helper.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const profileView = async (req, res, next) => {
  try {
    const user = req.user;
    createResponse(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

const profileEdit = async (req, res, next) => {
  try {
    const user = req.user;
    const allowedForEdit = [
      "firstName",
      "lastName",
      "gender",
      "photoUrl",
      "about",
      "age",
      "skill",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedForEdit.includes(field)
    );
    if (!isEditAllowed) {
      throw new Error("Edit is not allowed. Please check the fields!");
    }
    Object.keys(req.body).forEach((field) => (user[field] = req.body[field]));
    user.gender = req.body.gender.toUpperCase();
    await user.save();
    createResponse(res, 200, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const emailId = req.query.emailId;
    if (
      emailId == "" &&
      password == "" &&
      !validator.isStrongPassword(password) &&
      !validator.isEmail(emailId)
    ) {
      throw new Error("Invalid Fields");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user || user == {}) {
      throw new Error("User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const _user = await User.updateOne(
      { emailId: emailId },
      { password: hashedPassword }
    );
    if (_user.matchedCount === 0) {
      throw new Error("Failed to reset password");
    }
    return createResponse(res, 200, "Password reset successfully");
  } catch (error) {
    next(error);
  }
};

export { profileView, profileEdit, forgotPassword };
