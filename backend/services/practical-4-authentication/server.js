require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── CORS: Allow Netlify frontend + local dev ───────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:5500'
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
let poolConfig;

if (process.env.DATABASE_URL) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
  console.log('🌐 [PostgreSQL] Using DATABASE_URL (Cloud Connection)');
} else {
  const isRemote = Boolean(
    process.env.DB_SSL === 'true' ||
    (process.env.DB_HOST && !['localhost', '127.0.0.1'].includes(process.env.DB_HOST))
  );

  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin123',
    connectionTimeoutMillis: 5000,
    ssl: isRemote ? { rejectUnauthorized: false } : false
  };
  console.log('💻 [PostgreSQL] Configured for host:', poolConfig.host, 'port:', poolConfig.port);
}

let pool = new Pool(poolConfig);

let isDatabaseConnected = false;
let dbErrorMessage = '';

// Helper to label database type dynamically
function getDbLabel() {
  if (!isDatabaseConnected) return 'In-Memory Fallback';
  const url = process.env.DATABASE_URL || '';
  const host = process.env.DB_HOST || '';
  if (url.includes('supabase') || host.includes('supabase')) return 'Supabase PostgreSQL';
  if (url.includes('neon') || host.includes('neon')) return 'Neon Cloud PostgreSQL';
  if (url || (host && !['localhost', '127.0.0.1'].includes(host))) return 'Cloud PostgreSQL';
  return 'Local PostgreSQL';
}

// In-memory fallback data store in case PostgreSQL is offline
const inMemoryUsers = [
  { id: 101, name: 'Yash Gowardhan', email: 'yash@example.com', password: '', created_at: new Date().toISOString() },
  { id: 102, name: 'Admin Demo', email: 'admin@onyx.local', password: '', created_at: new Date().toISOString() }
];

(async () => {
  try {
    const hash = await bcrypt.hash('password123', 10);
    inMemoryUsers[0].password = hash;
    inMemoryUsers[1].password = hash;
  } catch (_) {}
})();

// Auto-create table & verify connection on startup
async function initDatabase() {
  async function connectAndInit(targetPool) {
    const client = await targetPool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100)  NOT NULL,
        email      VARCHAR(150)  UNIQUE NOT NULL,
        password   VARCHAR(255)  NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    client.release();
  }

  try {
    await connectAndInit(pool);
    isDatabaseConnected = true;

    const dbInfo = process.env.DATABASE_URL
      ? new URL(process.env.DATABASE_URL).hostname
      : (process.env.DB_HOST || 'localhost');

    console.log(`✅ [PostgreSQL] Connected to: ${dbInfo} (${getDbLabel()})`);
    console.log('✅ [PostgreSQL] "users" table verified and ready.');
  } catch (err) {
    // If direct Supabase IPv6 domain fails on IPv4 networks, attempt IPv4 pooler fallback
    const dbUrl = process.env.DATABASE_URL || '';
    const match = dbUrl.match(/@db\.([a-z0-9]+)\.supabase\.co:(\d+)\/([^?]+)/i);
    if (match) {
      const projectRef = match[1];
      const parsed = new URL(dbUrl);
      const user = parsed.username === 'postgres' ? `postgres.${projectRef}` : parsed.username;
      const poolerUrl = `postgresql://${user}:${encodeURIComponent(parsed.password)}@aws-1-eu-central-1.pooler.supabase.com:5432${parsed.pathname}`;

      console.warn('⚠️ [PostgreSQL] Direct IPv6 address unreachable; falling back to Supabase IPv4 Pooler...');
      try {
        const fallbackPool = new Pool({
          connectionString: poolerUrl,
          ssl: { rejectUnauthorized: false }
        });
        await connectAndInit(fallbackPool);
        pool = fallbackPool;
        isDatabaseConnected = true;
        console.log(`✅ [PostgreSQL] Connected via Supabase IPv4 Pooler (${getDbLabel()})`);
        console.log('✅ [PostgreSQL] "users" table verified and ready.');
        return;
      } catch (fallbackErr) {
        console.warn('⚠️ [PostgreSQL] Supabase pooler fallback failed:', fallbackErr.message);
      }
    }

    isDatabaseConnected = false;
    dbErrorMessage = err.message;
    console.warn('⚠️ [PostgreSQL] Database not reachable:', err.message);
    console.log('💡 [Authentication] Running in resilient In-Memory Fallback Mode.');
  }
}

initDatabase();

// ─── Health check probe for Dashboard ───────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'practical-4-auth', db: isDatabaseConnected ? 'postgres' : 'in-memory' }));

// ─── GET /api/status ─────────────────────────────────────────────────────────
app.get('/api/status', async (req, res) => {
  if (isDatabaseConnected) {
    try {
      const result = await pool.query('SELECT COUNT(*) AS count FROM users');
      return res.json({
        connected: true,
        database: getDbLabel(),
        registeredUsers: parseInt(result.rows[0].count, 10),
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      isDatabaseConnected = false;
    }
  }

  res.json({
    connected: true,
    database: 'In-Memory Mode (Start PostgreSQL for persistent DB)',
    registeredUsers: inMemoryUsers.length,
    timestamp: new Date().toISOString()
  });
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

  const normalizedEmail = email.trim().toLowerCase();

  if (isDatabaseConnected) {
    try {
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
      console.warn('[PostgreSQL Error, falling back to in-memory]:', err.message);
      isDatabaseConnected = false;
    }
  }

  // In-Memory Fallback
  if (inMemoryUsers.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email already exists. Please sign in instead.'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: inMemoryUsers.length + 101,
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    created_at: new Date().toISOString()
  };
  inMemoryUsers.push(newUser);

  return res.status(201).json({
    success: true,
    message: 'Account created successfully! (In-Memory Session)',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, created_at: newUser.created_at }
  });
});

// ─── POST /api/login ─────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim())
    return res.status(400).json({ success: false, message: 'Please enter your email address.' });

  if (!password)
    return res.status(400).json({ success: false, message: 'Please enter your password.' });

  const normalizedEmail = email.trim().toLowerCase();

  if (isDatabaseConnected) {
    try {
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
      console.warn('[PostgreSQL Error, falling back to in-memory]:', err.message);
      isDatabaseConnected = false;
    }
  }

  // In-Memory Fallback
  const user = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'No account found with this email. Please check your credentials or create an account.'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect password. Please verify and try again.'
    });
  }

  return res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}! Signed in successfully.`,
    user: { id: user.id, name: user.name, email: user.email, created_at: user.created_at }
  });
});

// ─── Fallback: serve index.html ───────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('🚀  Practical 4: Animated Authentication — RUNNING');
  console.log(`📡  URL:      http://localhost:${PORT}`);
  console.log(`🗄️  Database: ${getDbLabel()}`);
  console.log(`🌍  ENV:      ${process.env.NODE_ENV || 'development'}`);
  console.log('======================================================\n');
});
