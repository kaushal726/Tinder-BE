import mongoose from "mongoose";

const { Schema, model } = mongoose;

const connectionRequest = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "ignore", "interested"],
        message: `{VALUE} is not accepted`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequest.index({ fromUserId: 1 }, { toUserId: 1 });

connectionRequest.pre("save", async function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

const ConnectionRequestModel = new model(
  "ConnectionRequest",
  connectionRequest
);

export default ConnectionRequestModel;
