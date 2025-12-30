const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// @route   GET /api/analytics/engagement
// @desc    Get engagement analytics
// @access  Public
router.get("/engagement", async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" });

    const totalEngagement = posts.reduce((sum, post) => {
      return (
        sum +
        (post.engagement.likes +
          post.engagement.shares +
          post.engagement.comments)
      );
    }, 0);

    const avgEngagement =
      posts.length > 0 ? Math.round(totalEngagement / posts.length) : 0;

    const categoryStats = posts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = { count: 0, engagement: 0 };
      }
      acc[post.category].count++;
      acc[post.category].engagement +=
        post.engagement.likes +
        post.engagement.shares +
        post.engagement.comments;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalPosts: posts.length,
        totalEngagement,
        avgEngagement,
        categoryStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/analytics/time-analysis
// @desc    Get time-based analytics
// @access  Public
router.get("/time-analysis", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $match: { status: "published" } },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: "$publishedAt" },
            hour: { $hour: "$publishedAt" },
          },
          avgLikes: { $avg: "$engagement.likes" },
          avgShares: { $avg: "$engagement.shares" },
          avgComments: { $avg: "$engagement.comments" },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgLikes: -1 } },
    ]);

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/analytics/categories
// @desc    Get category performance
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categoryData = await Post.aggregate([
      { $match: { status: "published" } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          avgLikes: { $avg: "$engagement.likes" },
          avgShares: { $avg: "$engagement.shares" },
          avgViews: { $avg: "$engagement.views" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: categoryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
