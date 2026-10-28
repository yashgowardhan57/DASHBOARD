# DASHBOARD

PracticalOS — All Practicals Workspace Dashboard. A unified hub bringing together web development practical projects with live server status, filtering, and launch controls.

## Overview

PracticalOS organizes 6 core web development practicals into a modern, responsive dashboard interface:

| # | Project | Tech Stack | Type | Description |
|---|---|---|---|---|
| 01 | **Restaurant Page** | HTML5, CSS3 | Static | Responsive restaurant landing page |
| 02 | **E-Commerce Catalog** | HTML5, CSS3 | Static | Product catalog with grid layouts |
| 03 | **Developer Portfolio** | HTML5, CSS3, JavaScript | Dynamic Static | Interactive developer portfolio |
| 04 | **Authentication System** | Node.js, Express, PostgreSQL | Full Stack | Session-based login & registration |
| 05 | **News Portal** | Node.js, Express, EJS | Full Stack | Server-side rendered news feed |
| 06 | **Student Profile Directory** | Node.js, Express API, React | Full Stack | React student catalog with REST API |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [PostgreSQL](https://www.postgresql.org/) (for Practical 4)

### Quick Start (Dashboard Hub)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yashgowardhan57/DASHBOARD.git
   cd DASHBOARD
   ```

2. **Launch the Dashboard:**
   - On Windows: Double-click `START-DASHBOARD.bat` or run:
     ```bash
     npm start
     ```
   - Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Running Individual Practicals

For backend practicals (4, 5, and 6), run `npm install` inside their respective folders:

### Practical 4 — Authentication (Port 3001)
```bash
cd das/practical-4-authentication
npm install
cp .env.example .env   # configure your PostgreSQL credentials
npm start
```

### Practical 5 — News Portal (Port 3002)
```bash
cd das/practical-5-news-portal
npm install
npm start
```

### Practical 6 — Student Profile Directory (Port 3003)
```bash
cd das/practical-6-student-profile
npm install
npm start
```

---

## Dashboard Features

- 🔍 **Live Search & Filter**: Filter practicals by category (Frontend, Full-stack, React & API) or search keywords.
- ⭐ **Favorites & Progress**: Mark projects as favorites or completed (saved locally in browser).
- 🩺 **Live Health Check**: Real-time ping indicators for backend servers on ports 3001, 3002, and 3003.
- 🌓 **Theme Switcher**: Dark and light mode toggle with reduced-motion support.
- ⌨️ **Keyboard Navigation**: `Ctrl/Cmd + K` search shortcut and accessible dialogs.
