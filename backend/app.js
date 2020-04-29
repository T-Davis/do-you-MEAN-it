const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
  const post = req.body;
  console.log(post);
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
