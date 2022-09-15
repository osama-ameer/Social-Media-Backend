const express = require("express");
const app = express();
const connectDB = require("./config/db");
// const cors = require("cors");

// app.use(cors());
app.use(express.json({ extended: false }));

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is social app" });
});

app.use("/api/auth", require("./rotues/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

app.listen(PORT, () => {
  console.log(`Server has been started\nhttp://localhost:${PORT}`);
});