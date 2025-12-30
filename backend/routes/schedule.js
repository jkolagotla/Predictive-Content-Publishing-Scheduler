const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// @route   GET /api/schedule
// @desc    Get all scheduled posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const scheduledPosts = await Post.find({
      status: "scheduled",
      scheduledFor: { $gte: new Date() },
    }).sort({ scheduledFor: 1 });

    res.json({
      success: true,
      count: scheduledPosts.length,
      data: scheduledPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/schedule
// @desc    Schedule a post
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { postId, scheduledFor } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        scheduledFor: new Date(scheduledFor),
        status: "scheduled",
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post scheduled successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/schedule/:id
// @desc    Reschedule a post
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const { scheduledFor } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { scheduledFor: new Date(scheduledFor) },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post rescheduled successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/schedule/:id
// @desc    Cancel scheduled post
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        scheduledFor: null,
        status: "draft",
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Schedule cancelled successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
