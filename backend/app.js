require("dotenv").config()
require("console-stamp")(console);
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post")

const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connection to DB successful")
  })
  .catch(() => {
    console.log("Connection to DB failed")
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get("/api/posts", (req, res) => {
  const posts = [
    {
      id: "123",
      title: "first post",
      content: "first post content"
    },
    {
      id: "245",
      title: "second post",
      content: "second post content"
    },
  ];
  res.status(200).json({
    message: "posts fetched successfully",
    posts: posts
  });
});

module.exports = app;
