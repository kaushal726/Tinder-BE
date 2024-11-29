import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const { Schema, model } = mongoose;

const SECRET_KEY = "APPLICATION";

const connectionRequest = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "ACCEPTED", "REJECTED", "IGNORE"],
        message: `{VALUE} is not accepted`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConectionRequestModel = new model("ConnectionRequest", connectionRequest);

export default ConectionRequestModel;
