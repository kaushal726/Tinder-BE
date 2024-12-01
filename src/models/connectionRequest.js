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
        values: ["pending", "accepted", "rejected", "ignore", "interested"],
        message: `{VALUE} is not accepted`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequest.index({ fromUserId: 1 }, { toUserId: 1 })

connectionRequest.pre("save", async function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
})

const ConnectionRequestModel = new model("ConnectionRequest", connectionRequest);

export default ConnectionRequestModel;
