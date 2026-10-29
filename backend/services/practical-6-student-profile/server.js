const express = require('express');
const cors = require('cors');
const path = require('path');
const studentData = require('./data/students');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Root route serves client HTML
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- REST API Endpoints ----

// GET /api/health — Health check
app.get('/api/health', function (req, res) {
  res.json({
    ok: true,
    service: 'Practical 6 Student Profiles',
    port: PORT
  });
});

// GET /api/stats — Portal statistics
app.get('/api/stats', function (req, res) {
  res.json({
    success: true,
    data: studentData.getStats()
  });
});

// GET /api/students — List with search and department filtering
app.get('/api/students', function (req, res) {
  let list = studentData.getAllStudents();
  const search = (req.query.search || '').toLowerCase().trim();
  const dept = (req.query.dept || '').toLowerCase().trim();
  const year = (req.query.year || '').toLowerCase().trim();

  if (dept && dept !== 'all') {
    list = list.filter(function (s) {
      return s.department.toLowerCase() === dept;
    });
  }

  if (year && year !== 'all') {
    list = list.filter(function (s) {
      return s.yearLevel.toLowerCase().includes(year);
    });
  }

  if (search) {
    list = list.filter(function (s) {
      return (
        s.name.toLowerCase().includes(search) ||
        s.id.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.skills.some(function (skill) { return skill.toLowerCase().includes(search); })
      );
    });
  }

  res.json({
    success: true,
    count: list.length,
    data: list
  });
});

// GET /api/students/:id — Single student details
app.get('/api/students/:id', function (req, res) {
  const student = studentData.getStudentById(req.params.id);
  if (!student) {
    return res.status(404).json({
      success: false,
      error: 'Student record not found.'
    });
  }
  res.json({
    success: true,
    data: student
  });
});

// Start Server
app.listen(PORT, function () {
  console.log(`🎓 Practical 6 Student Profile API running on http://localhost:${PORT}`);
  console.log(`   API Endpoint: http://localhost:${PORT}/api/students`);
  console.log(`   Web Portal:   http://localhost:${PORT}/`);
});
