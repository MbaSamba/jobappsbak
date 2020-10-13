const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(process.env.DB_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("The DB is connected");
  })
  .catch(() => {
    console.error("Connection Failed");
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

module.exports = app;
