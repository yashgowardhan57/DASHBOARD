require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const SALT_ROUNDS = 12;

// ---- Database Configuration ----
const rawPassword = process.env.DB_PASSWORD;
const hasPassword = typeof rawPassword === 'string' && rawPassword.trim().length > 0;

let pool = null;
let dbConnected = false;
let dbStatusMessage = '';

if (!hasPassword) {
  dbStatusMessage = 'PostgreSQL DB_PASSWORD is not configured in .env. Please set your PostgreSQL password in practical-4-authentication/.env to enable live database authentication.';
  console.log('\n⚠️  PostgreSQL Notice for Practical 4:');
  console.log('   DB_PASSWORD is empty in practical-4-authentication/.env.');
  console.log('   To connect to your PostgreSQL database, please add your password:');
  console.log('   DB_PASSWORD=your_postgres_password\n');
} else {
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: String(rawPassword)
  });

  // Test database connection
  pool.query('SELECT NOW()')
    .then(function () {
      dbConnected = true;
      dbStatusMessage = 'Connected to PostgreSQL database';
      console.log('✅ Connected to PostgreSQL database successfully!');

      // Auto-create users table
      return pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
    })
    .then(function () {
      console.log('✅ Users table ready in PostgreSQL');
    })
    .catch(function (err) {
      dbConnected = false;
      dbStatusMessage = 'PostgreSQL connection failed: ' + err.message;
      console.error('❌ PostgreSQL connection error:', err.message);
      console.error('   Please check DB_PASSWORD in practical-4-authentication/.env');
    });
}

// ---- Middleware ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Expose hubUrl to views
app.use(function (req, res, next) {
  res.locals.hubUrl = process.env.HUB_URL || 'http://localhost:3000';
  next();
});

// Session store setup: use connect-pg-simple if pool is configured, else MemoryStore fallback
let sessionStore = undefined;
if (pool) {
  try {
    const pgSession = require('connect-pg-simple')(session);
    sessionStore = new pgSession({
      pool: pool,
      createTableIfMissing: true,
      errorLog: function (err) {
        console.warn('⚠️ Session store notice:', err.message);
      }
    });
  } catch (e) {
    sessionStore = undefined;
  }
}

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

// Make session user and DB status available to templates
app.use(function (req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.dbConnected = dbConnected;
  res.locals.dbStatusMessage = dbStatusMessage;
  next();
});

// ---- Auth Middleware ----
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
}

// ---- Routes ----

// Home — redirect to login or dashboard
app.get('/', function (req, res) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// Login page
app.get('/login', function (req, res) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  let initialNotice = null;
  if (!dbConnected && !hasPassword) {
    initialNotice = 'PostgreSQL is running, but DB_PASSWORD is not set in practical-4-authentication/.env. Please enter your PostgreSQL password in .env to enable authentication.';
  }
  res.render('auth', { mode: 'login', error: initialNotice });
});

// Register page
app.get('/register', function (req, res) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  let initialNotice = null;
  if (!dbConnected && !hasPassword) {
    initialNotice = 'PostgreSQL is running, but DB_PASSWORD is not set in practical-4-authentication/.env. Please enter your PostgreSQL password in .env to enable authentication.';
  }
  res.render('auth', { mode: 'register', error: initialNotice });
});

// In-memory fallback user store when PostgreSQL is temporarily offline
const inMemoryUsers = [];

// Health check endpoint
app.get('/api/health', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json({
    ok: true,
    service: 'Practical 4 Authentication',
    port: PORT,
    dbConnected: dbConnected,
    dbStatusMessage: dbStatusMessage
  });
});

// Handle Registration
app.post('/register', async function (req, res) {
  try {
    var { name, email, password, confirmPassword } = req.body;

    // Server-side validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).render('auth', {
        mode: 'register',
        error: 'All fields are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).render('auth', {
        mode: 'register',
        error: 'Password must be at least 6 characters.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).render('auth', {
        mode: 'register',
        error: 'Passwords do not match.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();

    if (pool && dbConnected) {
      // Check if email already exists in PostgreSQL
      var existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [cleanEmail]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).render('auth', {
          mode: 'register',
          error: 'An account with this email already exists in PostgreSQL.'
        });
      }

      // Hash password with 12 salt rounds
      var passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert user into PostgreSQL
      var result = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
        [cleanName, cleanEmail, passwordHash]
      );

      var newUser = result.rows[0];

      // Set session
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };

      return res.redirect('/dashboard');
    } else {
      // In-memory fallback mode
      var existingMem = inMemoryUsers.find(u => u.email === cleanEmail);
      if (existingMem) {
        return res.status(409).render('auth', {
          mode: 'register',
          error: 'An account with this email already exists.'
        });
      }

      var hash = await bcrypt.hash(password, SALT_ROUNDS);
      var memUser = {
        id: inMemoryUsers.length + 1,
        name: cleanName,
        email: cleanEmail,
        password_hash: hash
      };
      inMemoryUsers.push(memUser);

      req.session.user = {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email
      };

      return res.redirect('/dashboard');
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).render('auth', {
      mode: 'register',
      error: 'Registration error: ' + err.message
    });
  }
});

// Handle Login
app.post('/login', async function (req, res) {
  try {
    var { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('auth', {
        mode: 'login',
        error: 'Email and password are required.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (pool && dbConnected) {
      // Query user from PostgreSQL
      var result = await pool.query(
        'SELECT id, name, email, password_hash FROM users WHERE email = $1',
        [cleanEmail]
      );

      if (result.rows.length === 0) {
        return res.status(401).render('auth', {
          mode: 'login',
          error: 'Invalid email or password.'
        });
      }

      var user = result.rows[0];

      // Verify password hash
      var validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        return res.status(401).render('auth', {
          mode: 'login',
          error: 'Invalid email or password.'
        });
      }

      // Set session
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      return res.redirect('/dashboard');
    } else {
      // In-memory fallback mode
      var memUser = inMemoryUsers.find(u => u.email === cleanEmail);
      if (!memUser) {
        return res.status(401).render('auth', {
          mode: 'login',
          error: 'Invalid email or password.'
        });
      }

      var valid = await bcrypt.compare(password, memUser.password_hash);
      if (!valid) {
        return res.status(401).render('auth', {
          mode: 'login',
          error: 'Invalid email or password.'
        });
      }

      req.session.user = {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email
      };

      return res.redirect('/dashboard');
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('auth', {
      mode: 'login',
      error: 'Login error: ' + err.message
    });
  }
});

// Dashboard (protected route)
app.get('/dashboard', requireAuth, function (req, res) {
  res.render('dashboard', { user: req.session.user });
});

// Logout
app.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error('Logout error:', err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// ---- Start Server ----
app.listen(PORT, function () {
  console.log('🔐 Authentication Server running on http://localhost:' + PORT);
  console.log('   Login:    http://localhost:' + PORT + '/login');
  console.log('   Register: http://localhost:' + PORT + '/register');
});
