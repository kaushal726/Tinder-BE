import { createResponse } from "../utils/helper.js";
import ConnectionRequestModel from "../models/connectionRequest.js";
import User from "../models/users.js";

const sendRequest = async (req, res, next) => {
  try {
    const isStatusValid = ["interested", "ignore"];
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;
    if (fromUserId == "" && toUserId == "") {
      throw new Error("Invalid user");
    }
    if (!isStatusValid.includes(status)) {
      throw new Error("Invalid status");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("User not found");
    }

    const connectionRequestExist = await ConnectionRequestModel.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });
    if (connectionRequestExist) {
      throw new Error("Connection request already sent");
    }
    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    const response = await connectionRequest.save();
    createResponse(res, 200, "Connection request sent successfully", response);
  } catch (error) {
    next(error);
  }
};

const reviewRequest = async (req, res, next) => {
  try {
    const isStatusValid = ["accepted", "rejected"];

    const loggedInUser = req.user;
    const { userId, status } = req.params;
    if (!isStatusValid.includes(status)) {
      throw new Error("Invalid status");
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: userId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      throw new Error("User not found");
    }

    connectionRequest.status = status;
    const response = await connectionRequest.save();
    createResponse(res, 200, "Connection request sent successfully", response);
  } catch (error) {
    next(error);
  }
};

export { sendRequest, reviewRequest };
