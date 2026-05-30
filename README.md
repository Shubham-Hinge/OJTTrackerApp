# Smart OJT Productivity Tracker

A modern and responsive productivity management web application developed for tracking OJT daily activities, tasks, mentor feedback, and productivity analytics.

This project was developed as part of Week 1 OJT Developer Foundations training using:
- HTML5
- CSS3
- JavaScript
-MongoDB,Node.js and express.js
- Chart.js
- Git & GitHub

---

# Project Overview

The Smart OJT Productivity Tracker helps students and trainees:
- Track daily learning tasks
- Monitor productivity
- Manage mentor feedback
- Organize notes
- Visualize progress analytics
- Export task reports

The application is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

---

# Features Implemented (Till Day 5)

---

# Day 1 Features

- Project setup
- GitHub repository creation
- Folder structure setup
- Git initialization
- HTML, CSS, JavaScript linking
- VS Code environment setup

---

# Day 2 Features

- Responsive dashboard UI
- Sidebar navigation
- Summary cards
- Task form UI
- Search bar UI
- Notes section
- Glassmorphism design
- Dark mode functionality
- Media Queries implementation
- Mobile responsive layout

---

# Day 3 Features

- Add Task functionality
- Delete Task functionality
- Edit Task functionality
- Complete Task functionality
- Dynamic task rendering
- Dashboard updates
- Productivity percentage calculation
- Search/filter functionality
- Empty-state UI
- Toast notifications
- Dynamic DOM manipulation

---

# Day 4 Features

- Local Storage integration
- Persistent task saving
- Notes auto-save
- Chart.js analytics dashboard
- CSV export functionality
- Category filtering
- Doughnut productivity chart
- Improved responsive UI
- Data persistence after refresh

---

# Day 5 Features

- Advanced form validation
- Duplicate task prevention
- Delete confirmation popup
- Persistent dark mode
- Created timestamp tracking
- Enhanced toast notifications
- Error handling improvements
- Better user experience animations
- Performance optimization
- Improved LocalStorage handling

---

# Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Functionality |
| Local Storage | Data Persistence |
| Chart.js | Analytics Dashboard |
| Font Awesome | Icons |
| Git & GitHub | Version Control |

---

# Folder Structure

```bash
ojt_tracker/ │ ├── frontend/ │ ├── index.html │ ├── style.css │ ├── script.js │ └── assets/ │ ├── backend/ │ ├── server.js │ ├── package.json │ ├── routes/ │ ├── models/ │ ├── middleware/ │ └── config/ │ ├── assests/ │ └── screenshots/ │ ├── package.json └── README.md

nstallation
1. Clone Repository
git clone https://github.com/your-username/ojt-tracker.git
2. Navigate to Project
cd ojt-tracker
3. Install Backend Dependencies
cd backend
npm install
4. Configure Environment Variables

Create a .env file inside the backend folder.

PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
Running the Application
Start Backend Server
cd backend
npm start

or

nodemon server.js

Server runs on:

http://localhost:5000
Start Frontend

Open:

frontend/index.html

or run using VS Code Live Server.

API Endpoints
Authentication
Register User
POST /api/auth/register
Login User
POST /api/auth/login
Get User Profile
GET /api/auth/profile

Authorization Header:

Bearer <JWT_TOKEN>
Database Collections
Users
{
  name,
  email,
  password,
  role
}
Tasks
{
  title,
  description,
  status,
  priority,
  createdAt
}
Screenshots
Login Page
User Authentication
Secure Access
Dashboard
Productivity Overview
Task Statistics
Analytics Charts
Admin Panel
User Monitoring
Performance Tracking
Future Enhancements
Mobile Application
Attendance Management
Email Notifications
Mentor Evaluation Module
Export Reports (PDF/Excel)
AI-Based Productivity Suggestions
Cloud Deployment
Project Objectives
Digitalize OJT activity tracking.
Improve trainee productivity.
Reduce manual documentation.
Provide real-time progress visibility.
Enhance reporting and performance monitoring.
