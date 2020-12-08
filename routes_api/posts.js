const express = require("express");
const router = express.Router();

//Post Model

const Posts = require("../models/Post.js");
const { restart } = require("nodemon");

// Get all post

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Items");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Make post request

router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const post = await newPost.save();
    if (!post) throw Error("something is wrong at the time of saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Get post by ID

router.post("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post)
      throw Error("We are unable to get this post ID. Try one more time!");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Update post request

router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id);
    if (!post)
      throw Error(
        "We couldn't make an update that you need. Try one more time!"
      );
    res.status(200).json({ success: true });
  } catch (err) {
    restart.status(400).json({ msg: err });
  }
});

// Delete post request

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error("We couldn't find any posts");
    res.status(200).json({ success: true });
  } catch (err) {
    restart.status(400).json({ msg: err });
  }
});

module.exports = router;
