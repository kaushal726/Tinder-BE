import express from "express";
import {
  customValidators,
  createResponse,
  authSignUp,
  authLogin,
} from "../utils/helper.js";
import bcrypt from "bcrypt";
import ConnectionRequestModel from "../models/connectionRequest.js";
import { authValidator } from "../middlewares/auth.js";
import User from "../models/users.js";

const SECRET_KEY = "APPLICATION";
const userRequestRouter = express.Router();

userRequestRouter.get(
  "/user/request/recieved",
  authValidator,
  async (res, res, next) => {
    try {
      const user = req.user;
      const userRequests = await ConnectionRequestModel.find({
        toUser: user._id,
        status: "interested",
      }).populate("fromUserId", "firstName lastName age gender about photoUrl");
      createResponse(
        res,
        200,
        "User requests fetched successfully",
        userRequests
      );
    } catch (error) {
      next(error);
    }
  }
);

userRequestRouter.get(
  "/user/connections",
  authValidator,
  async (res, res, next) => {
    try {
      const user = req.user;
      const userRequests = await ConnectionRequestModel.find({
        $or: [
          { fromUserId: user.id, status: "interested" },
          { toUserId: user.id, status: "interested" },
        ],
      })
        .populate("fromUserId", "firstName lastName age gender about photoUrl")
        .populate("toUserId", "firstName lastName age gender about photoUrl");

      const data = userRequests.map((req) => {
        if (req.fromUserId.toString() == user._id.toString()) {
          return req.fromUserId;
        } else {
          return req.toUserId;
        }
      });

      createResponse(res, 200, "User requests fetched successfully", data);
    } catch (error) {
      next(error);
    }
  }
);

userRequestRouter.get("/user/feed", authValidator, async (res, res, next) => {
  try {
    const user = req.user;
    const userRequests = await ConnectionRequestModel.find({
      $and: [
        { fromUserId: { $not: { $eq: user._id } } },
        { toUserId: { $not: { $eq: user._id } } },
      ],
    })
      .populate("fromUserId", "firstName lastName age gender about photoUrl")
      .populate("toUserId", "firstName lastName age gender about photoUrl");

    createResponse(res, 200, "User requests fetched successfully", data);
  } catch (error) {
    next(error);
  }
});

export default userRequestRouter;
