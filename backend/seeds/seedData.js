const mongoose = require('mongoose');
const Post = require('../models/Post');
require('dotenv').config();

const samplePosts = [
  {
    title: "10 Productivity Hacks for Students",
    content: "Learn how to manage your time effectively and boost your grades with these proven strategies. From time-blocking to the Pomodoro technique, discover methods that work...",
    category: "blog",
    publishedAt: new Date('2024-12-01T09:00:00'),
    status: "published",
    engagement: { likes: 245, shares: 89, comments: 34, views: 1200 }
  },
  {
    title: "Study Tips for Final Exams",
    content: "Prepare for your finals with these proven strategies. Create effective study schedules, use active recall, and master your exam techniques...",
    category: "education",
    publishedAt: new Date('2024-12-05T14:00:00'),
    status: "published",
    engagement: { likes: 412, shares: 156, comments: 67, views: 2100 }
  },
  {
    title: "Best Apps for College Students 2024",
    content: "Discover the must-have apps for academic success. From note-taking to time management, these apps will transform your college experience...",
    category: "technology",
    publishedAt: new Date('2024-12-10T10:30:00'),
    status: "published",
    engagement: { likes: 589, shares: 234, comments: 98, views: 3400 }
  },
  {
    title: "Career Planning Guide for Graduates",
    content: "Navigate your career path with confidence. Learn how to network effectively, build your resume, and land your dream job...",
    category: "career",
  }]