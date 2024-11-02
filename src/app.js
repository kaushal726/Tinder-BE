import express from "express";
import connectDB from "./config/database.js";
import { isAdminAuth } from "./middlewares/auth.js";
import User from "./models/users.js";

const app = express();


// app.use("/", (req, res) => {
//   res.json("Hello World!");
// })

// app.use("/test", (req, res) => {
//   res.json("Test");
// })

// app.use("/ab+c", (req, res) => {
//   res.json({ "id": "Test" });
// })

// app.use("/ab?c", (req, res) => {

//   res.json("Test");
// })

// app.use("/ab*cd", (req, res) => {
//   res.json("Test");
// })

// app.use("/demo", (req, res, next) => {
//   console.log("Middleware executed");
//   next();
// }, (req, res, next) => {
//   res.json("Hello World!");
// })

// app.use("/demo", isAdminAuth)

// app.get("/demo/test", (req, res) => {
//   res.json({ message: "Hello from POST route" });
//   // throw new Error
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).json({ message: "We are Working on it, please keep patience" });
//   }
// })


app.post("/sign-up", async (req, res) => {
  const userData = {
    firstName: "Guddu",
    lastName: "Raj",
    email: "kaushal@gmail.com",
    password: "123456",
  }

  const user = new User(userData);
  await user.save()
  res.json({
    message: "User registered successfully"
  })
})

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
