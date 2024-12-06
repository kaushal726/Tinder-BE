import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const authValidator = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decodedObj = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedObj) {
      throw new Error("Unauthorized");
    }
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
