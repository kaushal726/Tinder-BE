import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const { Schema, model } = mongoose;

const SECRET_KEY = "APPLICATION";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
    required: true,
  },
  photoUrl: {
    type: String,
    default: "https://via.placeholder.com/150",
    validate(value) {
      if (!validator.isURL(value)) throw new Error("Invalid URL");
    },
  },
  about: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true,
  },
  skill: {
    type: [String],
  },
});

userSchema.method.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: "2d",
  });
};

userSchema.method.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordCorrect = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isPasswordCorrect;
};

const User = model("User", userSchema);
export default User;
