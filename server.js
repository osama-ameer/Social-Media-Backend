const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json({ extended: false })); // For JSON data in server side

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is social app" });
});

app.use("/api/auth", require("./rotues/auth"));
app.use("/api/users", require("./rotues/users"));
app.use("/api/posts", require("./rotues/posts"));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});