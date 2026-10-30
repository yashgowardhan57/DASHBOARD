# DASHBOARD — PracticalOS

PracticalOS is a modular web development practicals workspace dashboard. It organizes 6 core web practicals into a modern, responsive interface with live server health checks, filtering, keyboard shortcuts, and launch controls.

The project features a **separated frontend and backend architecture** designed for clean maintainability, local development, and seamless cloud deployment on Vercel, Netlify, Render, Railway, or Docker.

---

## 📁 Project Structure

```text
PracticalOS_Practical_Dashboard/
├── frontend/                          # Client-side Dashboard & Practicals
│   ├── index.html                     # Main Dashboard UI
│   ├── css/                           # Dashboard styles (dashboard.css)
│   ├── js/                            # Dashboard logic & config (config.js, dashboard.js)
│   ├── practicals/                    # All 6 web practical projects
│   │   ├── practical-1-restaurant/    # HTML5/CSS3 Restaurant Page
│   │   ├── practical-2-ecommerce/     # Multi-page E-Commerce Catalog
│   │   ├── practical-3-portfolio/     # Interactive Developer Portfolio
│   │   ├── practical-4-authentication/# Auth System Client & Launcher
│   │   ├── practical-5-news-portal/   # News Portal Client & Launcher
│   │   └── practical-6-student-profile/# React Components Student Directory Client
│   ├── vercel.json                    # Vercel deployment config
│   └── netlify.toml                   # Netlify deployment config
│
├── backend/                           # Server-side APIs & Microservices
│   ├── hub-server.js                  # Local Hub & Orchestrator (ports 3000–3003)
│   ├── server.js                      # Unified Cloud API Gateway
│   ├── package.json                   # Backend dependencies & scripts
│   ├── .env.example                   # Environment variable template
│   ├── Dockerfile                     # Backend Docker container
│   ├── render.yaml                    # Render.com deployment blueprint
│   ├── Procfile                       # Heroku / Railway web process
│   └── services/                      # Standalone Backend Services
│       ├── practical-4-authentication/# Express + PostgreSQL + bcrypt Auth server (Port 3001)
│       ├── practical-5-news-portal/   # Express + EJS News Portal server (Port 3002)
│       └── practical-6-student-profile/# Express REST API for students & stats (Port 3003)
│
├── docker-compose.yml                 # Full-stack Docker compose configuration
├── START-DASHBOARD.bat                # Windows 1-Click Launcher
├── DEPLOYMENT.md                      # Comprehensive Cloud Deployment Guide
└── package.json                       # Root workspace scripts
```

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later)
- [PostgreSQL](https://www.postgresql.org/) *(optional, for Practical 4 live database)*

### 1-Click Launch (Windows)
Double-click **`START-DASHBOARD.bat`** or run:
```bash
npm start
```
This launches the hub server and automatically starts all backend practical servers on ports 3001–3003, then opens [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Cloud Deployment

Detailed step-by-step instructions for all major cloud providers are available in [DEPLOYMENT.md](file:///c:/Users/haris/Downloads/PracticalOS_Practical_Dashboard/DEPLOYMENT.md):

- **Frontend on Vercel or Netlify**: Deploy the `frontend/` directory with zero build configuration.
- **Backend on Render or Railway**: Deploy the `backend/` directory using `render.yaml` or `Procfile`.
- **1-Command Docker Deployment**: Run `docker compose up --build` anywhere.

---

## 🛠️ Monorepo Commands

Run from project root:

```bash
# Start local hub orchestrator (spawns all practical servers & serves frontend)
npm start

# Run unified backend server (API gateway & cloud server)
npm run start:backend

# Run frontend development server
npm run start:frontend

# Install all backend microservice dependencies
npm run install:all

# Run individual backend practicals:
npm run start:p4    # Practical 4 Authentication (Port 3001)
npm run start:p5    # Practical 5 News Portal (Port 3002)
npm run start:p6    # Practical 6 Student Profile API (Port 3003)
```

---

## 📑 Practical Overview

| # | Project | Tech Stack | Type | Location |
|---|---|---|---|---|
| 01 | **BLACK PLATE Restaurant Page** | HTML5, CSS3 | Static Frontend | `frontend/practicals/practical-1-restaurant/` |
| 02 | **JOGE STORE Product Catalog** | HTML5, CSS3, CSS Grid, Flexbox | Static Frontend | `frontend/practicals/practical-2-ecommerce/` |
| 03 | **Developer Portfolio** | HTML5, CSS3, JavaScript | Modern Static | `frontend/practicals/practical-3-portfolio/` |
| 04 | **ONYX Authentication Gateway** | Node.js, Express, PostgreSQL, Bcrypt | Full Stack | `frontend/` & `backend/services/practical-4-authentication/` |
| 05 | **Daily Pulse News Portal** | Node.js, Express, EJS, CSS Grid | Full Stack | `frontend/` & `backend/services/practical-5-news-portal/` |
| 06 | **campus. Student Directory** | React, Vite, Express REST API | Full Stack | `frontend/` & `backend/services/practical-6-student-profile/` |

---

## ✨ Dashboard Features

- 🔍 **Live Search & Filter**: Instant filtering by category (Frontend, Full-stack, React & API) and keyword search.
- ⭐ **Favorites & Progress**: Mark projects as favorites or completed (saved locally in your browser).
- 🩺 **Live Health Check**: Real-time ping indicators for backend servers on ports 3001, 3002, and 3003.
- 🌓 **Theme Switcher**: Dark and light mode toggle with reduced-motion support.
- ⌨️ **Keyboard Navigation**: `Ctrl/Cmd + K` search shortcut and accessible dialogs.
