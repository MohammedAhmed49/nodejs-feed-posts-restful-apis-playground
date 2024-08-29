const express = require("express");
const { getPosts, createPost } = require("../controllers/feed");
const { body } = require("express-validator");

const router = express.Router();

// GET /feed/posts
router.get("/posts", getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 7 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

module.exports = router;
