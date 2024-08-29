const express = require("express");
const path = require("path");

const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// app.use(bodyParser.urlencoded()) // This is for data submitted by <form> (x-www-form-urlencoded)

app.use(bodyParser.json()); // This is for json format sent in the request (application/json)
app.use("images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode ?? 500).json({ message: error.message });
});

mongoose
  .connect(
    "mongodb+srv://mohammed:123@cluster0.qkxwsji.mongodb.net/social?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
