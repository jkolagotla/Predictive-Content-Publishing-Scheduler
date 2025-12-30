const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/posts", require("./routes/posts"));
app.use("/api/schedule", require("./routes/schedule"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/analytics", require("./routes/analytics"));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "✅ Content Scheduler API is running!",
    version: "1.0.0",
    endpoints: {
      posts: "/api/posts",
      schedule: "/api/schedule",
      ai: "/api/ai",
      analytics: "/api/analytics",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   🚀 Server running on port ${PORT}    ║
  ║   📊 API: http://localhost:${PORT}     ║
  ║   🔗 Environment: ${process.env.NODE_ENV || "development"}        ║
  ╚═══════════════════════════════════════╝
  `);
});

module.exports = app;
