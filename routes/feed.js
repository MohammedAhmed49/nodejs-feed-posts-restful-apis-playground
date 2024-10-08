const express = require("express");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getStatus,
  updateStatus,
} = require("../controllers/feed");
const { body } = require("express-validator");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  isAuth,
  createPost
);

router.get("/post/:postId", isAuth, getPost);

router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  isAuth,
  updatePost
);

router.delete("/post/:postId", isAuth, deletePost);

router.get("/mystatus", isAuth, getStatus);

router.post(
  "/mystatus",
  [body("status").trim().isLength({ min: 1 })],
  isAuth,
  updateStatus
);

module.exports = router;
