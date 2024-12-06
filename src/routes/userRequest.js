import express from "express";
import { authValidator } from "../middlewares/auth.js";
import {
  userConnections,
  userFeeds,
  userRequests,
} from "../controllers/userRequest.js";

const userRequestRouter = express.Router();

userRequestRouter.get("/user/request/recieved", authValidator, userRequests);

userRequestRouter.get("/user/connections", authValidator, userConnections);

userRequestRouter.get("/user/feed", authValidator, userFeeds);

export default userRequestRouter;
