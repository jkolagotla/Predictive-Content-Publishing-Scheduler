# Predictive Content Publishing Scheduler

A web-based application designed to analyze past content engagement data and use AI-based analysis to recommend optimal content publishing times and effective subject lines. The project focuses on providing an interactive scheduling interface and demonstrating how AI insights can assist content planning decisions.

---

## 🚀 Features

- React-based dashboard displaying historical posts and engagement metrics  
- AI-generated recommendations for optimal publishing times and catchy headlines  
- Calendar-based content scheduling interface  
- Drag-and-drop style scheduling workflow  
- CSV export of scheduled posts for further use or integration  
- Clean and modular project structure  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Lucide React Icons  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Atlas)  

### AI Integration
- OpenAI API (used for analyzing engagement patterns and generating recommendations)

---

## 📁 Project Structure

Predictive-Content-Publishing-Scheduler/
│
├── frontend/                       # React Frontend
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── ContentScheduler.jsx   # Main dashboard & scheduling UI
│   │   │
│   │   ├── App.js                     # Root React component
│   │   ├── index.js                   # React DOM entry point
│   │   ├── index.css                  # Global styles (Tailwind & custom CSS)
│   │
│   ├── package.json                  # Frontend dependencies
│   └── tailwind.config.js             # Tailwind CSS configuration
│
├── backend/                        # Node.js Backend
│   ├── config/
│   │   └── db.js                      # MongoDB connection configuration
│   │
│   ├── models/
│   │   └── Post.js                    # MongoDB schema for posts & metrics
│   │
│   ├── routes/
│   │   ├── postRoutes.js              # API routes for posts
│   │   └── aiRoutes.js                # AI analysis & recommendations
│   │
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies
│   └── .env                          # Environment variables (not pushed)
│
├── screenshots/                     # Project screenshots
│   ├── dashboard.png
│   ├── ai-insights.png
│   ├── scheduler.png
│   └── new-post.png
│
├── .gitignore                       # Git ignored files
├── README.md                        # Project documentation
└── LICENSE                          # MIT License

Outputs
