require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── CORS: Allow Netlify frontend + local dev ───────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3001',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  // Add your Netlify domain here after deployment, e.g.:
  // 'https://your-practical-hub.netlify.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ─── PostgreSQL Connection Pool ──────────────────────────────────────────────
// Supports both DATABASE_URL (Neon/Render/Supabase) and individual env vars
let poolConfig;

if (process.env.DATABASE_URL) {
  // Cloud: Neon, Supabase, Railway, ElephantSQL all provide DATABASE_URL
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon / Supabase / most cloud Postgres
    }
  };
  console.log('🌐 [PostgreSQL] Using DATABASE_URL (Cloud Connection)');
} else {
  // Local development fallback
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin123'
  };
  console.log('💻 [PostgreSQL] Using individual DB_* env vars (Local)');
}

const pool = new Pool(poolConfig);

let isDatabaseConnected = false;
let dbErrorMessage = '';

// Auto-create table & verify connection on startup
async function initDatabase() {
  try {
    const client = await pool.connect();
    isDatabaseConnected = true;

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100)  NOT NULL,
        email      VARCHAR(150)  UNIQUE NOT NULL,
        password   VARCHAR(255)  NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const dbInfo = process.env.DATABASE_URL
      ? new URL(process.env.DATABASE_URL).hostname
      : (process.env.DB_HOST || 'localhost');

    console.log(`✅ [PostgreSQL] Connected to: ${dbInfo}`);
    console.log('✅ [PostgreSQL] "users" table verified and ready.');
    client.release();
  } catch (err) {
    isDatabaseConnected = false;
    dbErrorMessage = err.message;
    console.error('❌ [PostgreSQL] Connection failed:', err.message);
  }
}

initDatabase();

// ─── GET /api/status ─────────────────────────────────────────────────────────

// Health check probe for Dashboard
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'practical-4-auth' }));

app.get('/api/status', async (req, res) => {
  if (!isDatabaseConnected) {
    return res.status(503).json({
      connected: false,
      message: 'PostgreSQL database disconnected',
      error: dbErrorMessage
    });
  }
  try {
    const result = await pool.query('SELECT COUNT(*) AS count FROM users');
    const dbLabel = process.env.DATABASE_URL
      ? 'Neon Cloud PostgreSQL'
      : (process.env.DB_NAME || 'postgres');

    res.json({
      connected: true,
      database: dbLabel,
      registeredUsers: parseInt(result.rows[0].count, 10),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

// ─── POST /api/register ───────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim())
    return res.status(400).json({ success: false, message: 'Please enter your full name.' });

  if (!email || !email.trim())
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim()))
    return res.status(400).json({ success: false, message: 'Please provide a valid email format.' });

  if (!password || password.length < 8)
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const existing = await pool.query(
      'SELECT id FROM users WHERE LOWER(email) = $1 LIMIT 1;',
      [normalizedEmail]
    );
    if (existing.rows.length > 0)
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists. Please sign in instead.'
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at;`,
      [name.trim(), normalizedEmail, hashedPassword]
    );
    const newUser = result.rows[0];
    console.log(`[DB] Registered: ${newUser.name} <${newUser.email}> ID#${newUser.id}`);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to ONYX.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email, created_at: newUser.created_at }
    });
  } catch (err) {
    console.error('[DB Error] Registration:', err.message);
    return res.status(500).json({ success: false, message: 'Database error during registration.' });
  }
});

// ─── POST /api/login ─────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim())
    return res.status(400).json({ success: false, message: 'Please enter your email address.' });

  if (!password)
    return res.status(400).json({ success: false, message: 'Please enter your password.' });

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const result = await pool.query(
      'SELECT id, name, email, password, created_at FROM users WHERE LOWER(email) = $1 LIMIT 1;',
      [normalizedEmail]
    );

    if (result.rows.length === 0)
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please check your credentials or create an account.'
      });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please verify and try again.'
      });

    console.log(`[DB] Authenticated: ${user.name} <${user.email}> ID#${user.id}`);
    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}! Signed in successfully.`,
      user: { id: user.id, name: user.name, email: user.email, created_at: user.created_at }
    });
  } catch (err) {
    console.error('[DB Error] Login:', err.message);
    return res.status(500).json({ success: false, message: 'Database error during sign in.' });
  }
});

// ─── Fallback: serve index.html ───────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const dbMode = process.env.DATABASE_URL ? 'Neon Cloud PostgreSQL' : 'Local PostgreSQL';
  console.log('\n======================================================');
  console.log('🚀  Practical 4: Animated Authentication — RUNNING');
  console.log(`📡  URL:      http://localhost:${PORT}`);
  console.log(`🗄️  Database: ${dbMode}`);
  console.log(`🌍  ENV:      ${process.env.NODE_ENV || 'development'}`);
  console.log('======================================================\n');
});
