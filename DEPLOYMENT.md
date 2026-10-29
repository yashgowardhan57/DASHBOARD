# 🚀 PracticalOS Deployment Guide

This project is organized into separated **`frontend/`** and **`backend/`** architectures for modularity, clean code separation, and effortless cloud deployment.

---

## 📁 Repository Architecture

```text
PracticalOS_Practical_Dashboard/
├── frontend/                          # Client-side web application
│   ├── index.html                     # PracticalOS Workspace Dashboard
│   ├── css/
│   │   └── dashboard.css              # Design system & styles
│   ├── js/
│   │   ├── config.js                  # Dynamic API URL runtime configuration
│   │   └── dashboard.js               # Dashboard UI logic & health checks
│   ├── practicals/                    # All 6 web practicals
│   │   ├── practical-1-restaurant/    # P1: HTML5/CSS3 Restaurant Page
│   │   ├── practical-2-ecommerce/     # P2: Multi-page Product Catalog
│   │   ├── practical-3-portfolio/     # P3: Developer Portfolio
│   │   ├── practical-4-authentication/# P4: Auth Client & Launcher
│   │   ├── practical-5-news-portal/   # P5: News Portal Client & Launcher
│   │   └── practical-6-student-profile/# P6: React Component Directory & Client
│   ├── package.json                   # Frontend preview scripts
│   ├── vercel.json                    # Vercel deployment configuration
│   └── netlify.toml                   # Netlify deployment configuration
│
├── backend/                           # Server-side APIs & microservices
│   ├── hub-server.js                  # Multi-service local orchestrator (zero dependencies)
│   ├── server.js                      # Unified cloud Express server & API gateway
│   ├── package.json                   # Consolidated backend dependencies
│   ├── .env.example                   # Backend environment variables template
│   ├── Dockerfile                     # Containerized backend build
│   ├── render.yaml                    # Render.com blueprint deployment
│   ├── Procfile                       # Heroku / Railway web process definition
│   └── services/                      # Backend microservices
│       ├── practical-4-authentication/# Express + PostgreSQL + bcrypt Auth server
│       ├── practical-5-news-portal/   # Express + EJS News server
│       └── practical-6-student-profile/# Express REST API for students & stats
│
├── docker-compose.yml                 # Full-stack Docker compose (Frontend + Backend + PostgreSQL)
├── START-DASHBOARD.bat                # Windows 1-click launcher
├── package.json                       # Root monorepo workspace scripts
└── README.md                          # Project documentation
```

---

## 🌐 Option 1: Deploy Frontend (Vercel / Netlify / GitHub Pages)

The **`frontend/`** directory is completely static and ready for instant deployment on any CDN or static hosting platform.

### Deploying to Vercel
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import your GitHub repository.
3. In **Root Directory**, click *Edit* and select **`frontend`**.
4. Framework Preset: **Other**.
5. Click **Deploy**. Vercel will automatically read `frontend/vercel.json`.

### Deploying to Netlify
1. Go to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Select your repository.
3. Set **Base directory** to: `frontend`
4. Set **Publish directory** to: `frontend` (or `.` if base directory is set).
5. Click **Deploy site**. Netlify automatically uses `frontend/netlify.toml`.

### Connecting Frontend to Your Deployed Backend
In `frontend/js/config.js`, you can configure your production backend URL, or inject it via an inline script before `config.js` in `frontend/index.html`:
```html
<script>
  window.__ENV__ = {
    HUB_URL: 'https://your-backend.onrender.com',
    STATUS_ENDPOINT: 'https://your-backend.onrender.com/api/status',
    AUTH_URL: 'https://your-backend.onrender.com/api/auth/login',
    NEWS_URL: 'https://your-backend.onrender.com/api/news/',
    STUDENT_URL: 'https://your-backend.onrender.com/api/students/'
  };
</script>
```

---

## ☁️ Option 2: Deploy Backend (Render / Railway / Fly.io / Heroku)

The **`backend/`** directory contains:
- `server.js`: Unified cloud server that exposes `/api/status`, `/api/students`, and mounts health checks with CORS enabled for any frontend origin.
- `render.yaml`: Ready-to-go blueprint for Render.com.
- `Procfile`: Ready for Heroku or Railway.

### Deploying to Render.com (Free Tier)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `*` (or your Vercel/Netlify frontend URL)
   - `SESSION_SECRET` = `your_random_secret_here`
   - *(Optional for PostgreSQL)*: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
5. Click **Create Web Service**.

### Deploying with PostgreSQL on Render
1. In Render, click **New** > **PostgreSQL**.
2. Copy the Internal Database URL / credentials.
3. In your backend Web Service, set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` matching your PostgreSQL database.

---

## 🐳 Option 3: Full-Stack Docker Deployment (1-Command Deploy)

You can run the entire stack (Backend + Database + Frontend static serving) on any VPS (AWS, DigitalOcean, Hetzner, Linode) or locally using Docker Compose:

```bash
docker compose up -d --build
```

This starts:
- **`backend`**: Node.js backend container listening on port `3000` (serving API + Frontend)
- **`db`**: PostgreSQL 15 database container on port `5432` with automated persistent volume

To view the app:
Open `http://localhost:3000` in your browser.

To stop the containers:
```bash
docker compose down
```

---

## 💻 Local Development

### 1-Click Launch (Windows)
Double-click **`START-DASHBOARD.bat`** or run:
```bash
npm start
```
This automatically starts `backend/hub-server.js` and auto-spawns all practical backend servers (ports 3001–3003) while serving the frontend on `http://localhost:3000`.

### Running Frontend & Backend Separately
If you want to run frontend and backend in separate terminals:

**Terminal 1 (Backend Gateway):**
```bash
npm run start:backend
# Runs backend/server.js on port 3000
```

**Terminal 2 (Frontend Dev Server):**
```bash
npm run start:frontend
# Serves frontend static files
```

### Running Individual Practical Servers
```bash
npm run start:p4   # Runs Practical 4 Authentication on port 3001
npm run start:p5   # Runs Practical 5 News Portal on port 3002
npm run start:p6   # Runs Practical 6 Student Profile API on port 3003
```
