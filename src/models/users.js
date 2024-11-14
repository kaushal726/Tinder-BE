import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "Password must be at least 8 characters long, contain a lowercase letter, an uppercase letter, a number, and a special character."
        );
      }
    },
  },
});

const User = model("User", userSchema);
export default User;
