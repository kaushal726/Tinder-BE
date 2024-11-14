import express from "express";
import connectDB from "./config/database.js";
import { isAdminAuth } from "./middlewares/auth.js";
import User from "./models/users.js";
import validaLogin from "./helper/validator.js";
import bcrypt from "bcrypt";
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
  };

  const user = new User(userData);
  await user.save();
  res.json({
    message: "User registered successfully",
  });
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = res.body;
    validaLogin(emailId, password);

    const user = await User.findOne({ email: emailId });
    if (user) {
      if (user.password === password) {
        res.json({
          message: "Login successful",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = res.body;
    validaLogin(email, password, firstName, lastName);
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    user.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed : " + err);
  });
