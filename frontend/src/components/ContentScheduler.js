import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  Download,
  Plus,
  X,
  BarChart3,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";

const ContentScheduler = () => {
  const [posts, setPosts] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState("");

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "blog",
  });

  useEffect(() => {
    setPosts([
      {
        id: 1,
        title: "10 Productivity Hacks for Students",
        publishedAt: "2024-12-01T09:00",
        category: "education",
        engagement: { likes: 245, shares: 89, comments: 34, views: 1200 },
      },
      {
        id: 2,
        title: "Study Tips for Final Exams",
        publishedAt: "2024-12-05T14:00",
        category: "education",
        engagement: { likes: 412, shares: 156, comments: 67, views: 2100 },
      },
    ]);
  }, []);

  const engagementScore = (e) =>
    Math.round((e.likes + e.shares * 3 + e.comments * 2 + e.views * 0.1) / 10);

  const analyzeWithAI = () => {
    setLoading(true);
    setTimeout(() => {
      setAiSuggestions({
        bestTimes: [
          { day: "Tuesday", time: "10:00 AM", score: 95 },
          { day: "Thursday", time: "2:00 PM", score: 88 },
        ],
        headlineSuggestions: [
          "5 Proven Study Methods That Actually Work",
          "How Top Students Study Smarter",
        ],
        insights: {
          topCategory: "education",
          bestDayOfWeek: "Thursday",
          avgEngagement: 84,
          optimalLength: "800–1200 words",
        },
      });
      setLoading(false);
    }, 1500);
  };

  const schedulePost = () => {
    const post = {
      id: Date.now(),
      ...newPost,
      scheduledFor: selectedDate,
      status: "Scheduled",
    };
    setScheduledPosts([...scheduledPosts, post]);
    setShowNewPost(false);
    setNewPost({ title: "", content: "", category: "blog" });
    setSelectedDate("");
  };

  const exportCSV = () => {
    const csv =
      "Title,Category,Schedule\n" +
      scheduledPosts
        .map(
          (p) =>
            `${p.title},${p.category},${new Date(
              p.scheduledFor
            ).toLocaleString()}`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "scheduled_posts.csv";
    link.click();
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">AI Content Scheduler</h1>

      <div className="flex gap-3 mb-6">
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("schedule")}>Schedule</button>
      </div>

      {view === "dashboard" && (
        <>
          <button onClick={analyzeWithAI} disabled={loading} className="mb-4">
            {loading ? "Analyzing..." : "Generate AI Insights"}
          </button>

          {aiSuggestions && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">Best Times</h3>
              {aiSuggestions.bestTimes.map((t, i) => (
                <p key={i}>
                  {t.day} – {t.time} ({t.score}%)
                </p>
              ))}

              <h3 className="font-bold mt-4 mb-2">Headlines</h3>
              {aiSuggestions.headlineSuggestions.map((h, i) => (
                <p key={i}>{h}</p>
              ))}
            </div>
          )}

          <h2 className="text-xl font-bold mt-6 mb-3">Historical Posts</h2>
          {posts.map((p) => (
            <div key={p.id} className="bg-white p-4 mb-3 rounded shadow">
              <h3 className="font-bold">{p.title}</h3>
              <p>{p.category}</p>
              <p>Score: {engagementScore(p.engagement)}</p>
            </div>
          ))}
        </>
      )}

      {view === "schedule" && (
        <>
          <button onClick={() => setShowNewPost(true)}>New Post</button>
          <button onClick={exportCSV} disabled={!scheduledPosts.length}>
            Export CSV
          </button>

          {scheduledPosts.map((p) => (
            <div key={p.id} className="bg-white p-4 mt-3 rounded shadow">
              <h3 className="font-bold">{p.title}</h3>
              <p>{new Date(p.scheduledFor).toLocaleString()}</p>
            </div>
          ))}
        </>
      )}

      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-4">New Post</h2>

            <input
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full mb-2"
            />

            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full mb-2"
            />

            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full mb-3"
            />

            <button onClick={schedulePost}>Schedule</button>
            <button onClick={() => setShowNewPost(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentScheduler;
