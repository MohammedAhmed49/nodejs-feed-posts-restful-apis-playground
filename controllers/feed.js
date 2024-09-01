const { validationResult } = require("express-validator");
const Post = require("../models/post");
const { errorHandler } = require("../utils/error");
const { clearFile } = require("../utils/files");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      errorHandler(next, err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  if (!req.file) {
    const error = new Error("No image was uploaded!");
    error.statusCode = 422;
    throw error;
  }

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
    imageUrl: "images/" + req.file.filename,
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
      errorHandler(next, err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("No post was found!");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ post });
    })
    .catch((err) => {
      errorHandler(next, err);
    });
};

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    throw error;
  }

  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = "images/" + req.file.filename;
  }

  if (!imageUrl) {
    const error = new Error("No image was uploaded");
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("No post was found");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearFile(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((err) => errorHandler(next, err));
};
