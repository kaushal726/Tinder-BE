import express from "express";

const app = express();

app.use("/test", (req, res) => {
  res.json({ message: "This is a test endpoint" });
});

app.use("/test", (req, res) => {
  res.json({ message: "This is a test endpoint" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
