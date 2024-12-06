import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import connectionRequest from "./routes/connectionRequest.js";

const app = express();
const PORT = process.env.PORT || 7000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", connectionRequest);

app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Bad Request";

  res.status(status).json({
    statusCode: status,
    message,
    error: err.stack,
  });
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed");
  });
