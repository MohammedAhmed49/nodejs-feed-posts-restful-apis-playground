exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "Post 1", content: "Test for post 1" }],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  // Create new row in posts table in DB

  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title, content },
  });
};
