const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Helper function to calculate engagement score
const calculateEngagementScore = (engagement) => {
  return (
    (engagement.likes * 1 +
      engagement.shares * 3 +
      engagement.comments * 2 +
      engagement.views * 0.1) /
    10
  );
};

// @route   POST /api/ai/analyze
// @desc    Analyze engagement patterns and provide insights
// @access  Public
router.post("/analyze", async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(50);

    if (posts.length === 0) {
      return res.json({
        success: true,
        message: "Not enough data for analysis",
        data: {
          bestTimes: [],
          headlineSuggestions: [],
          insights: {},
        },
      });
    }

    // Analyze time patterns
    const timeSlots = {};
    posts.forEach((post) => {
      const date = new Date(post.publishedAt);
      const hour = date.getHours();
      const day = date.getDay();
      const key = `${day}-${hour}`;

      if (!timeSlots[key]) {
        timeSlots[key] = { count: 0, totalEngagement: 0 };
      }

      timeSlots[key].count++;
      timeSlots[key].totalEngagement += calculateEngagementScore(
        post.engagement
      );
    });

    // Find best times
    const bestTimes = Object.entries(timeSlots)
      .map(([key, data]) => {
        const [day, hour] = key.split("-");
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const avgEngagement = data.totalEngagement / data.count;

        return {
          day: days[parseInt(day)],
          time: `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`,
          score: Math.min(100, Math.round(avgEngagement * 2)),
          reason:
            avgEngagement > 50
              ? "Highest engagement in historical data"
              : "Good engagement window",
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Generate headline suggestions (mock AI)
    const { category = "general" } = req.body;
    const headlineSuggestions = [
      `Unlock Your Potential: 5 Game-Changing ${category} Strategies`,
      `The Ultimate Guide to Mastering ${category} Success`,
      `Why Top Performers Use These ${category} Techniques`,
    ];

    // Calculate insights
    const totalEngagement = posts.reduce(
      (sum, p) => sum + calculateEngagementScore(p.engagement),
      0
    );
    const avgEngagement = Math.round(totalEngagement / posts.length);

    const categoryStats = {};
    posts.forEach((post) => {
      if (!categoryStats[post.category]) {
        categoryStats[post.category] = 0;
      }
      categoryStats[post.category]++;
    });

    const topCategory =
      Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "blog";

    res.json({
      success: true,
      data: {
        bestTimes,
        headlineSuggestions,
        insights: {
          avgEngagement,
          topCategory,
          bestDayOfWeek: bestTimes[0]?.day || "Thursday",
          optimalLength: "800-1200 words",
          totalAnalyzed: posts.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/ai/headlines
// @desc    Generate headline suggestions
// @access  Public
router.post("/headlines", async (req, res) => {
  try {
    const { topic, category } = req.body;

    const headlines = [
      `${topic}: The Complete Guide for ${category} Success`,
      `Discover the Secret to ${topic} That Nobody Tells You`,
      `10 Proven ${topic} Strategies That Actually Work`,
      `Why ${topic} is Changing the ${category} Industry`,
      `Master ${topic}: Essential Tips for Beginners`,
    ];

    res.json({
      success: true,
      data: { headlines },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/ai/optimal-time
// @desc    Predict optimal posting time for category
// @access  Public
router.post("/optimal-time", async (req, res) => {
  try {
    const { category } = req.body;

    const posts = await Post.find({
      category,
      status: "published",
    })
      .sort({ publishedAt: -1 })
      .limit(30);

    if (posts.length < 3) {
      return res.json({
        success: true,
        message: "Not enough historical data",
        data: { optimalTimes: [] },
      });
    }

    const timeSlots = {};
    posts.forEach((post) => {
      const hour = new Date(post.publishedAt).getHours();
      const day = new Date(post.publishedAt).getDay();
      const key = `${day}-${hour}`;

      if (!timeSlots[key]) {
        timeSlots[key] = { count: 0, totalEngagement: 0 };
      }

      timeSlots[key].count++;
      timeSlots[key].totalEngagement += calculateEngagementScore(
        post.engagement
      );
    });

    const optimalTimes = Object.entries(timeSlots)
      .map(([key, data]) => {
        const [day, hour] = key.split("-");
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return {
          day: days[day],
          hour: parseInt(hour),
          avgEngagement: Math.round(data.totalEngagement / data.count),
        };
      })
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 3);

    res.json({
      success: true,
      data: { optimalTimes },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
