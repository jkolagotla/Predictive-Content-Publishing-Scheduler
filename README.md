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
<img width="1416" height="504" alt="image" src="https://github.com/user-attachments/assets/a39c7970-a6a2-4ba0-9b30-341fd6b925bc" />
<img width="1387" height="732" alt="image" src="https://github.com/user-attachments/assets/78971542-7f7f-4821-9519-7b6ca10904e1" />
<img width="1363" height="738" alt="image" src="https://github.com/user-attachments/assets/ff500f4f-e845-4464-9547-d973cb8284de" />
<img width="1398" height="656" alt="image" src="https://github.com/user-attachments/assets/613e5d66-3ff4-48ec-83de-2310a5f160c5" />
<img width="1363" height="738" alt="image" src="https://github.com/user-attachments/assets/e9bdf8e8-c489-48bd-ab69-3fabf346f9ab" />
<img width="1382" height="701" alt="image" src="https://github.com/user-attachments/assets/94ece3f6-58a4-4e38-bf64-dbb320081e6c" />
<img width="1238" height="806" alt="image" src="https://github.com/user-attachments/assets/4281b88c-7e56-4ea6-9ecb-effd3e8f17e8" />




