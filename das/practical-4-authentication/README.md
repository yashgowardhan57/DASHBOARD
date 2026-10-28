# Practical 4: Animated Login & Registration System (Full-Stack)

**Title:** Create an Animated Login and Registration Page  
**Technology:** HTML5, CSS3, JavaScript, Node.js, Express.js, PostgreSQL, Bcrypt, and Express-Session  
**Theme:** Premium Black and Crimson Red (`#E50914`)  
**Developer:** Yash Gowardhan (B.Tech IT, 3rd Year)

---

## 📖 Overview
A full-stack authentication gateway featuring animated client panels, server-side validation, 12-round bcrypt password hashing, persistent PostgreSQL sessions, and protected routes.

> **Note:** This is the **only practical** among all six that connects to a database.

---

## 🗄️ Database Architecture (PostgreSQL)

### Users Table Schema
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
- **Passwords:** Never stored in plaintext; hashed using `bcrypt` with salt rounds = 12.
- **Email:** Indexed with a `UNIQUE` constraint and converted to lowercase.
- **Sessions:** Stored in PostgreSQL via `connect-pg-simple` with `HttpOnly` security cookies.

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL server installed and running

### Step 1: Install Dependencies
```bash
cd practical-4-authentication
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env` and fill in your PostgreSQL credentials:
```bash
# Windows PowerShell
copy .env.example .env
```
Edit `.env`:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=practical_hub_auth
DB_USER=postgres
DB_PASSWORD=your_postgres_password
SESSION_SECRET=super_secret_session_key_change_me
```

### Step 3: Run Database Schema
```bash
# Using psql command line
psql -U postgres -f schema.sql
```
*(The server also contains auto-initialization queries that create the table automatically on startup).*

### Step 4: Start the Server
```bash
npm start
```

Access the application in your browser:
- **Sign In:** `http://localhost:3001/login`
- **Register:** `http://localhost:3001/register`
- **Protected Dashboard:** `http://localhost:3001/dashboard`
- **Launcher & Status Probe:** `http://localhost:3000/practical-4-authentication/index.html`

---

## 🧪 Testing Report & Edge Cases
1. **Empty Fields:** Rejected both client-side and server-side with HTTP 400.
2. **Password Mismatch:** Flagged on client and rejected on server.
3. **Short Password (< 6 chars):** Blocked on submit.
4. **Duplicate Email:** Returns HTTP 409 Conflict with friendly error banner.
5. **Session Expiry:** Destroyed on `/logout` with cookie cleared.
6. **Unauthenticated Dashboard Access:** Redirects directly to `/login`.
