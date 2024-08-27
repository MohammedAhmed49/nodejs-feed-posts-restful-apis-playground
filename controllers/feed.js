const { validationResult } = require("express-validator");

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
    res.status(422).json({
      message: "Validation failed!",
      errors: errors.array(),
    });
  }

  // Create new row in posts table in DB

  res.status(201).json({
    message: "Post created successfully",
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: {
        name: "Mohammed",
      },
      createdAt: new Date(),
    },
  });
};
