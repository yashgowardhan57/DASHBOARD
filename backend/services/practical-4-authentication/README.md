# Practical 4: Create an Animated Login and Registration Page

| Experiment | Title | Real-Life Scenario | Concepts Covered |
| :---: | :--- | :--- | :--- |
| **4** | **Create an Animated Login and Registration Page** | A company wants a modern authentication page with smooth animations and transitions. | **CSS Animations, Transitions, Keyframes** |

---

## 📌 Project Overview
This project implements **Practical 4** for **ONYX Modern Authentication Gateway**, precisely matching the UI layout, dual-column structure, sleek frosted dark aesthetic, typography, and interactive components from the reference manual image.

- **Theme**: Dark Minimalist / ONYX Sleek Palette (`#0b0c10` Canvas, `#131419` Glassmorphism Card, Delicate 1px Borders, Ambient Glowing Lights).
- **Smooth Animations & Transitions**:
  - CSS Keyframes for card entrance, floating ambient background glows, pulsing live status dot, and toast alerts.
  - Smooth sliding and opacity transitions between the **Sign In** and **Create Account** forms.
  - Interactive micro-animations for input focus rings, password show/hide eye toggles, button hover lifts, and loaders.
- **Full-Stack Database Connectivity**:
  - Connected live to a **PostgreSQL** database on port `5432`.
  - Secure password hashing using **Bcrypt** (10 salt rounds).
  - RESTful API endpoints for user registration (`/api/register`), authentication (`/api/login`), and live DB status (`/api/status`).

---

## 📁 File Structure
```
d:\dash\practical-4\
│
├── index.html         # Semantic HTML5 authentication page matching the reference UI
├── styles.css         # Modern CSS featuring CSS Variables, Keyframes & Transitions
├── script.js          # JavaScript for form toggles, validation, and PostgreSQL Fetch API
├── server.js          # Express.js backend with PostgreSQL pool & Bcrypt hashing
├── package.json       # Project configuration and Node.js dependencies
├── .env               # PostgreSQL environment credentials (host, user, password, port)
├── .env.example       # Example template for environment setup
└── README.md          # Comprehensive practical manual report & execution instructions
```

---

## 🧩 Sections Included (Strictly as per Reference UI)

### 1. Left Showcase & Brand Panel (`ONYX`)
- **Brand Header**:
  - Logo icon with rounded dark badge and inner geometric square/circle.
  - Brand name: `ONYX` (bold uppercase).
- **Tagline / Eyebrow**:
  - `✦ SECURE ACCESS` (uppercase, letter-spaced).
- **Headline**:
  - `Your account.`
  - `Your control.`
- **Description Paragraph**:
  - *“A modern authentication experience designed with smooth animations, transitions and secure access.”*
- **3 Feature Bullets**:
  1. `Secure Authentication`: *Safe and protected account access.*
  2. `Smooth Experience`: *Fast transitions and animations.*
  3. `Responsive Design`: *Works perfectly on all devices.*
- **Left Panel Footer**:
  - Copyright: `© 2026 ONYX`
  - Links: `Privacy` • `Terms`

---

### 2. Right Form Panel — State 1: Sign In
- **Header**:
  - Eyebrow: `WELCOME BACK`
  - Title: `Sign In`
  - Subtitle: `Enter your details to continue.`
- **Form Controls**:
  - **Email Address**: Mail icon + placeholder `name@business.com`
  - **Password**: Lock icon + placeholder `Enter your password` + interactive show/hide eye toggle
  - **Options Row**: `[✓] Remember me` checkbox + `Forgot password?` link
  - **Primary Action**: `Sign In →` full-width button
- **Social Login**:
  - Divider: `OR CONTINUE WITH`
  - Side-by-side action buttons: `Google` and `GitHub`
- **Switcher Prompt**:
  - `Don't have an account?` `Create Account` (triggers smooth transition to registration form).

---

### 3. Right Form Panel — State 2: Create Account (Registration)
- **Header**:
  - Eyebrow: `GET STARTED`
  - Title: `Create Account`
  - Subtitle: `Create your account in a few seconds.`
- **Form Controls**:
  - **Full Name**: User icon + placeholder `Your full name`
  - **Email Address**: Mail icon + placeholder `name@business.com`
  - **Password**: Lock icon + placeholder `Create a password` + interactive show/hide eye toggle
  - **Password Requirement**: `✓ Use at least 8 characters` (dynamically verifies as you type)
  - **Terms Agreement**: `[✓] I agree to the Terms of Service and Privacy Policy`
  - **Primary Action**: `Create Account` full-width button
- **Switcher Prompt**:
  - `Already have an account?` `Sign In` (triggers smooth transition back to sign-in form).

---

## 💫 CSS Animations, Transitions & Keyframes Implemented

| Animation / Transition | CSS Concept | Purpose / Visual Effect |
| :--- | :--- | :--- |
| `@keyframes cardEntrance` | CSS Keyframes | Smooth fade-in and scale-up when the page loads |
| `@keyframes ambientDrift1 & 2` | CSS Keyframes | Subtle ambient glowing background spheres drifting smoothly |
| `@keyframes formFadeInSlide` | CSS Keyframes & Transitions | Seamless slide-and-fade transition between Sign In and Create Account |
| `@keyframes pulseDot` | CSS Keyframes | Pulsing live indicator for real-time PostgreSQL connectivity |
| `@keyframes toastSlideIn` | CSS Keyframes | Animated alert toasts for success and error feedback |
| `@keyframes spin` | CSS Keyframes | Clean loader spinner during authentication requests |
| `transition: all 0.32s cubic-bezier` | CSS Transitions | Input focus glow, button lift, and password eye toggle transitions |

---

## 🗄️ PostgreSQL Database Integration

### Database Architecture
- **Database Engine**: PostgreSQL 18 (Local instance on port `5432`)
- **Default Database**: `postgres`
- **Security**: Passwords hashed with `bcrypt` (10 salt rounds) before storing in PostgreSQL.

### Table Schema (`users`)
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints
- `GET /api/status`: Returns live PostgreSQL connection health and registered user count.
- `POST /api/register`: Validates inputs, checks duplicate email, hashes password, inserts into PostgreSQL.
- `POST /api/login`: Looks up email, verifies hashed password using `bcrypt.compare()`, returns authenticated user.

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL service running on `localhost:5432`

### 2. Configure Environment
Verify `.env` inside `practical-4/`:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=admin123
```

### 3. Start the Application
Open a terminal in `d:\dash\practical-4` and run:
```bash
npm start
```

### 4. Access in Browser
Open:
```
http://localhost:3001
```
- Click **Create Account** to test the smooth sliding transition.
- Register a new account to insert directly into PostgreSQL.
- Sign in with your registered credentials to verify live authentication and view the active session dashboard.

