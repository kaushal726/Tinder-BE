import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator"

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Strong password")
            }
        }
    },
}, { timestamps: true })

const User = model("User", userSchema)
export default User
