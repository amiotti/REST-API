const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//GET ALL THE POSTS
router.get("/", async (req, res) => {
  const posts = Post.find();
  try {
    const posts = await Post.find(); //method from Mongoose
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A POST
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// GET A SPECIFIC POST

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//DELETE SPECIFIC POST

router.delete("/:postId", async (req, res) => {
  try {
    const deleted = await Post.remove({ _id: req.params.postId });
    res.json(deleted);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//UPDATE A POST

router.patch("/:postId", async (req, res) => {
  try {
    const updated = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updated);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
