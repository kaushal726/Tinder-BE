import express from "express";
import { authValidator } from "../middlewares/auth.js";
import {
  reviewRequest,
  sendRequest,
} from "../controllers/connectionRequest.js";

const connectionRequest = express.Router();

connectionRequest.post("/send/:status/:userId", authValidator, sendRequest);

connectionRequest.post("/review/:status/:userId", authValidator, reviewRequest);

export default connectionRequest;
