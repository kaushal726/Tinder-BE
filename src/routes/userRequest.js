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

const SAFE_DATA = "firstName lastName age gender about photoUrl";

userRequestRouter.get(
  "/user/request/recieved",
  authValidator,
  async (res, res, next) => {
    try {
      const user = req.user;
      const userRequests = await ConnectionRequestModel.find({
        toUser: user._id,
        status: "interested",
      }).populate("fromUserId", SAFE_DATA);
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
        .populate("fromUserId", SAFE_DATA)
        .populate("toUserId", SAFE_DATA);

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
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    limit = limit > 50 ? 50 : limit;
    let skip = page - 1 * limit;

    const userRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const userNotAllowed = new Set();
    userRequests.forEach((req) => {
      userRequests.add(req.fromUserId.toString(), req.toUserId.toString());
    });

    const usersForFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(userNotAllowed) } },
        { _id: { $ne: user._id } },
      ],
    })
      .select(SAFE_DATA)
      .skip(skip)
      .limit(limit);

    createResponse(
      res,
      200,
      "User requests fetched successfully",
      usersForFeed
    );
  } catch (error) {
    next(error);
  }
});

export default userRequestRouter;
