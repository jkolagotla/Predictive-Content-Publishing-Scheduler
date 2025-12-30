const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "blog",
        "education",
        "technology",
        "career",
        "marketing",
        "social",
      ],
      default: "blog",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    scheduledFor: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published"],
      default: "draft",
    },
    engagement: {
      likes: { type: Number, default: 0, min: 0 },
      shares: { type: Number, default: 0, min: 0 },
      comments: { type: Number, default: 0, min: 0 },
      views: { type: Number, default: 0, min: 0 },
    },
    aiSuggestedHeadlines: [
      {
        type: String,
      },
    ],
    aiOptimalTime: {
      type: String,
      default: null,
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for engagement score
postSchema.virtual("engagementScore").get(function () {
  return Math.round(
    (this.engagement.likes * 1 +
      this.engagement.shares * 3 +
      this.engagement.comments * 2 +
      this.engagement.views * 0.1) /
      10
  );
});

// Indexes for better query performance
postSchema.index({ publishedAt: -1 });
postSchema.index({ scheduledFor: 1 });
postSchema.index({ status: 1 });
postSchema.index({ category: 1 });
postSchema.index({ createdAt: -1 });

// Pre-save middleware
postSchema.pre("save", function (next) {
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
