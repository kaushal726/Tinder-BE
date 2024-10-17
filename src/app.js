import express from "express";
import connectDB from "./config/database.js";

const app = express();

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed");
  });
