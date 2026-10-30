'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();
const PORT = process.env.PORT || process.env.HUB_PORT || 3000;
const FRONTEND_DIR = path.resolve(__dirname, '..', 'frontend');

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Service Health Probe Helper ----
function probeLocalPort(port, route = '/api/health') {
  return new Promise(resolve => {
    const req = http.request({ hostname: '127.0.0.1', port, path: route, method: 'GET', timeout: 800 }, res => {
      res.resume();
      resolve({ online: res.statusCode >= 200 && res.statusCode < 500, statusCode: res.statusCode });
    });
    req.on('timeout', () => { req.destroy(); resolve({ online: false, statusCode: null }); });
    req.on('error', () => resolve({ online: false, statusCode: null }));
    req.end();
  });
}

// ---- Practical 6 Student API Integration ----
let studentData = null;
try {
  studentData = require('./services/practical-6-student-profile/data/students');
} catch {
  console.warn('[Server] Practical 6 student data module not found locally');
}

// GET /api/students
app.get('/api/students', (req, res) => {
  if (!studentData) return res.status(503).json({ success: false, error: 'Student data unavailable' });
  let list = studentData.getAllStudents();
  const search = (req.query.search || '').toLowerCase().trim();
  const dept = (req.query.dept || '').toLowerCase().trim();
  const year = (req.query.year || '').toLowerCase().trim();

  if (dept && dept !== 'all') {
    list = list.filter(s => s.department.toLowerCase() === dept);
  }
  if (year && year !== 'all') {
    list = list.filter(s => s.yearLevel.toLowerCase().includes(year));
  }
  if (search) {
    list = list.filter(s => 
      s.name.toLowerCase().includes(search) || 
      s.department.toLowerCase().includes(search) || 
      (s.skills && s.skills.some(sk => sk.toLowerCase().includes(search)))
    );
  }
  res.json({ success: true, count: list.length, data: list });
});

// GET /api/stats

// ---- Practical 4 Auth Endpoints (Unified Gateway) ----
const gatewayUsers = [
  { id: 101, name: 'Yash Gowardhan', email: 'yash@example.com', password: 'password123', created_at: new Date().toISOString() },
  { id: 102, name: 'Admin Demo', email: 'admin@onyx.local', password: 'password123', created_at: new Date().toISOString() }
];

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (gatewayUsers.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }
  const newUser = {
    id: gatewayUsers.length + 101,
    name: name.trim(),
    email: normalizedEmail,
    password,
    created_at: new Date().toISOString()
  };
  gatewayUsers.push(newUser);
  res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to ONYX.',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, created_at: newUser.created_at }
  });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  const user = gatewayUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
  }
  res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}! Signed in successfully.`,
    user: { id: user.id, name: user.name, email: user.email, created_at: user.created_at }
  });
});

app.get('/api/stats', (req, res) => {
  if (!studentData) return res.status(503).json({ success: false, error: 'Student stats unavailable' });
  res.json({ success: true, data: studentData.getStats() });
});

// GET /api/status — Unified health probe for all practicals
app.get('/api/status', async (req, res) => {
  const [p4, p5, p6] = await Promise.all([
    probeLocalPort(3001, '/api/health'),
    probeLocalPort(3002, '/api/health'),
    probeLocalPort(3003, '/api/health')
  ]);

  // If running unified in cloud, mark student API online since it's mounted in this process
  const p6Online = p6.online || Boolean(studentData);

  res.json({
    ok: true,
    checkedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    servers: {
      '3001': { online: p4.online, name: 'Authentication', port: 3001, status: p4.online ? 'online' : 'standalone' },
      '3002': { online: p5.online, name: 'News portal', port: 3002, status: p5.online ? 'online' : 'standalone' },
      '3003': { online: p6Online, name: 'Student profiles', port: 3003, status: p6Online ? 'online' : 'standalone' }
    }
  });
});

// General health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'PracticalOS Gateway Backend', uptime: process.uptime() });
});

// Direct routing aliases for practicals
app.get(['/login', '/register', '/auth'], (req, res) => {
  const p4Path = path.join(FRONTEND_DIR, 'practicals', 'practical-4-authentication', 'index.html');
  if (fs.existsSync(p4Path)) return res.sendFile(p4Path);
  res.redirect('/practicals/practical-4-authentication/index.html');
});

app.get(['/news', '/portal'], (req, res) => {
  const p5Path = path.join(FRONTEND_DIR, 'practicals', 'practical-5-news-portal', 'index.html');
  if (fs.existsSync(p5Path)) return res.sendFile(p5Path);
  res.redirect('/practicals/practical-5-news-portal/index.html');
});

app.get(['/student-profile', '/directory'], (req, res) => {
  const p6Path = path.join(FRONTEND_DIR, 'practicals', 'practical-6-student-profile', 'index.html');
  if (fs.existsSync(p6Path)) return res.sendFile(p6Path);
  res.redirect('/practicals/practical-6-student-profile/index.html');
});

// Serve frontend static assets if available (e.g. unified deployment)
if (fs.existsSync(FRONTEND_DIR)) {
  console.log(`[Server] Serving static frontend from: ${FRONTEND_DIR}`);
  app.use(express.static(FRONTEND_DIR));

  // Client-side fallback for dashboard routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    const indexPath = path.join(FRONTEND_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`  PracticalOS Backend Server running on port ${PORT}`);
  console.log(`  Health API:   http://localhost:${PORT}/api/status`);
  console.log(`  Students API: http://localhost:${PORT}/api/students`);
  if (fs.existsSync(FRONTEND_DIR)) {
    console.log(`  Frontend App: http://localhost:${PORT}`);
  }
  console.log(`======================================================\n`);
});

module.exports = app;
