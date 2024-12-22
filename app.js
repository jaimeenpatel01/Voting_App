const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./routes/userRoutes");
const candidateRouter = require("./routes/candidateRoutes");
const voteRouter = require("./routes/voteRoutes");
const dashboardRouter = require("./controllers/dashboardController");

dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successfully !!!");
  })
  .catch((e) => console.log("Error:", e));

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/candidate", candidateRouter);
app.use("/api/v1/vote", voteRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

module.exports = app;
