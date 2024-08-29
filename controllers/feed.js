const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "Post 1",
        content: "Test for post 1",
        imageUrl: "images/goku.jpg",
        creator: {
          name: "Mohammed",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    throw error;
  }

  // Create new row in posts table in DB

  const post = new Post({
    title,
    content,
    imageUrl: "images/goku.jpg",
    creator: {
      name: "Mohammed",
    },
  });

  post
    .save()
    .then((post) => {
      res.status(201).json({
        message: "Post created successfully",
        post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
