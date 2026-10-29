// Main React App Component for Practical 6
// Demonstrates State Management, Effects, Props Passing, and Event Handling

const { useState, useEffect, useMemo } = React;

function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApiMode, setIsApiMode] = useState(false);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Modal State
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Departments list for filter buttons
  const departments = ['All', 'Information Technology', 'Computer Science', 'Artificial Intelligence', 'Cyber Security'];

  // Fetch student data on mount
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);

    const apiBase = window.STUDENT_API_URL || 
      (window.APP_CONFIG && window.APP_CONFIG.hubUrl) || 
      'https://dashboard-3-lobf.onrender.com';

    try {
      // Probe Express API endpoint
      const res = await fetch(`${apiBase}/api/students`);
      if (!res.ok) throw new Error('API server returned error status');
      const json = await res.json();
      setStudents(json.data || []);

      // Fetch stats
      const statsRes = await fetch(`${apiBase}/api/stats`);
      if (statsRes.ok) {
        const statsJson = await statsRes.json();
        setStats(statsJson.data);
      }
      setIsApiMode(true);
    } catch (err) {
      console.warn(`Backend API server not reachable at ${apiBase || 'current host'}. Falling back to local data:`, err);
      // Fallback local dataset
      if (window.FALLBACK_STUDENTS) {
        setStudents(window.FALLBACK_STUDENTS);
        computeLocalStats(window.FALLBACK_STUDENTS);
      }
      setIsApiMode(false);
    } finally {
      setLoading(false);
    }
  }

  function computeLocalStats(data) {
    const total = data.length;
    const depts = Array.from(new Set(data.map(s => s.department)));
    const avgGpa = (data.reduce((acc, s) => acc + parseFloat(s.gpa), 0) / total).toFixed(2);
    const avgAtt = Math.round(data.reduce((acc, s) => acc + parseInt(s.attendance, 10), 0) / total) + '%';
    setStats({
      totalStudents: total,
      departmentsCount: depts.length,
      departments: depts,
      averageGpa: avgGpa,
      averageAttendance: avgAtt
    });
  }

  // Filtered students computed via useMemo
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Dept filter
      if (selectedDept !== 'All' && student.department !== selectedDept) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'All' && !student.yearLevel.includes(selectedYear)) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(q);
        const matchesId = student.id.toLowerCase().includes(q);
        const matchesDept = student.department.toLowerCase().includes(q);
        const matchesSkills = (student.skills || []).some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesId && !matchesDept && !matchesSkills) {
          return false;
        }
      }
      return true;
    });
  }, [students, search, selectedDept, selectedYear]);

  return (
    <div className="portal-app">
      {/* Top Bar */}
      <div className="portal-topbar">
        <div className="container topbar-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={window.HUB_URL || (typeof window !== 'undefined' && window.location.protocol === 'file:' ? '../../index.html' : '/index.html')}
              className="back-to-hub-link"
              id="hubLink"
            >
              &larr; Practical Hub
            </a>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-khaki)' }}>
              Practical 6 &bull; React Components &amp; Props
            </span>
          </div>
          <div className="college-affiliation">
            St. Vincent Pallotti College of Engg. &amp; Tech, Nagpur
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="portal-header">
        <div className="container header-content">
          <div className="portal-brand">
            <div className="brand-shield">&#127891;</div>
            <div className="brand-titles">
              <h1>ScholarProfile Portal</h1>
              <p>Undergraduate Academic Registry &amp; Student Profile Directory</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="react-badge-pill">
              <span className="react-icon-spin">&#9881;</span>
              {isApiMode ? 'Live Express API (Port 3003)' : 'Client-Side Active'}
            </span>
            <button
              onClick={fetchData}
              className="clear-btn"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
              title="Refresh student records from Express backend"
            >
              &#8635; Sync Data
            </button>
          </div>
        </div>
      </header>

      {/* Reusable Component: StatsBar with Props */}
      <StatsBar stats={stats} />

      {/* Main Container */}
      <main className="container" style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* Search & Filter Controls Card */}
        <section className="controls-card" aria-label="Student filtering controls">
          <div className="controls-row">
            <div className="search-input-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
              <input
                type="text"
                className="search-field"
                placeholder="Search scholars by name, roll ID, skill (e.g., React, Python)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filter by academic year"
            >
              <option value="All">All Academic Years</option>
              <option value="1st">First Year</option>
              <option value="2nd">Second Year</option>
              <option value="3rd">Third Year</option>
              <option value="4th">Final Year</option>
            </select>

            {(search || selectedDept !== 'All' || selectedYear !== 'All') && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => { setSearch(''); setSelectedDept('All'); setSelectedYear('All'); }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Department Pills */}
          <div className="dept-pills-row" role="tablist" aria-label="Department filters">
            {departments.map((dept, index) => (
              <button
                key={index}
                type="button"
                className={`dept-pill ${selectedDept === dept ? 'active' : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </section>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <div>
            Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> scholars
            {selectedDept !== 'All' && <span> in <em>{selectedDept}</em></span>}
          </div>
          <div style={{ fontSize: '0.75rem' }}>
            Sorted by Academic Roll Sequence
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="state-box">
            <div className="spinner"></div>
            <p>Loading student profiles from Express API service...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredStudents.length === 0 && (
          <div className="state-box">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-walnut)', marginBottom: '0.5rem' }}>
              No Student Records Match
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              No scholars found matching the selected query or filters.
            </p>
            <button
              type="button"
              className="clear-btn"
              onClick={() => { setSearch(''); setSelectedDept('All'); setSelectedYear('All'); }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Students Cards Grid: Demonstrates mapping through props */}
        {!loading && filteredStudents.length > 0 && (
          <div className="students-grid">
            {filteredStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onSelectStudent={(stu) => setSelectedStudent(stu)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Profile Detail Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* College Portal Footer */}
      <footer className="portal-footer">
        <div className="container footer-inner">
          <div>
            <strong>ScholarProfile &bull; Web Development Practical 6</strong>
            <p style={{ color: 'var(--color-timberwolf)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Built with React Functional Components, JSX, and Express.js REST API
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: 'var(--color-isabelline)' }}>Yash Gowardhan</span> &bull; B.Tech IT &bull; 3rd Year
          </div>
        </div>
      </footer>
    </div>
  );
}

// Global dataset fallback if Express is offline
window.FALLBACK_STUDENTS = [
  {
    id: "STU-2024-001",
    name: "Yash Gowardhan",
    initials: "YG",
    department: "Information Technology",
    course: "B.Tech Information Technology",
    year: "Third Year (Sem VI)",
    yearLevel: "3rd Year",
    email: "yash.gowardhan@svpcet.edu.in",
    college: "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
    focus: "Web Application Development",
    motto: "Learn, Build, Improve",
    gpa: "9.24",
    attendance: "94%",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js", "PostgreSQL", "Git & GitHub", "DSA", "System Design"],
    bio: "Passionate full-stack developer focusing on performant web architecture, modern component libraries, and clean engineering standards."
  },
  {
    id: "STU-2024-002",
    name: "Aarav Sharma",
    initials: "AS",
    department: "Computer Science",
    course: "B.Tech Computer Science & Engineering",
    year: "Third Year (Sem VI)",
    yearLevel: "3rd Year",
    email: "aarav.sharma@svpcet.edu.in",
    college: "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
    focus: "Cloud Computing & DevOps",
    motto: "Automate and Optimize",
    gpa: "8.92",
    attendance: "91%",
    skills: ["Docker", "Kubernetes", "Linux", "Python", "Go", "AWS", "CI/CD"],
    bio: "Infrastructure engineer dedicated to automated pipeline construction and microservices scaling."
  },
  {
    id: "STU-2024-003",
    name: "Ananya Deshmukh",
    initials: "AD",
    department: "Artificial Intelligence",
    course: "B.Tech AI & Data Science",
    year: "Final Year (Sem VIII)",
    yearLevel: "4th Year",
    email: "ananya.deshmukh@svpcet.edu.in",
    college: "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
    focus: "Computer Vision & Deep Learning",
    motto: "Transforming Data into Insight",
    gpa: "9.45",
    attendance: "96%",
    skills: ["PyTorch", "TensorFlow", "OpenCV", "Python", "NumPy", "Pandas", "Scikit-Learn"],
    bio: "Researcher specializing in convolutional architectures and medical imaging classification models."
  },
  {
    id: "STU-2024-004",
    name: "Rohan Kulkarni",
    initials: "RK",
    department: "Information Technology",
    course: "B.Tech Information Technology",
    year: "Second Year (Sem IV)",
    yearLevel: "2nd Year",
    email: "rohan.kulkarni@svpcet.edu.in",
    college: "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
    focus: "Mobile App Engineering",
    motto: "Building for Every Screen",
    gpa: "8.68",
    attendance: "88%",
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "SQLite", "Figma"],
    bio: "Mobile-first developer designing fluid, cross-platform Android and iOS utilities."
  },
  {
    id: "STU-2024-005",
    name: "Pooja Verma",
    initials: "PV",
    department: "Cyber Security",
    course: "B.Tech Cyber Security",
    year: "Third Year (Sem VI)",
    yearLevel: "3rd Year",
    email: "pooja.verma@svpcet.edu.in",
    college: "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
    focus: "Penetration Testing & Cryptography",
    motto: "Security by Architecture",
    gpa: "9.10",
    attendance: "93%",
    skills: ["Wireshark", "Burp Suite", "Kali Linux", "Network Security", "Cryptography", "Python"],
    bio: "Security analyst auditing authentication tokens, CSRF mitigations, and database injection risks."
  },
  {
    id: "STU-2024-006",
    name: "Siddharth Nair",
    initials: "SN",
    department: "Computer Science",
    course: "B.Tech Computer Science & Engineering",
    year: "First Year (Sem II)",
    yearLevel: "1st Year",
    email: "siddharth.nair@svpcet.edu.in",
    college: "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
    focus: "Algorithmic Foundations",
    motto: "Foundations First",
    gpa: "8.75",
    attendance: "95%",
    skills: ["C++", "C", "Data Structures", "Algorithms", "Object-Oriented Design"],
    bio: "Competitive programmer focusing on algorithmic optimization, tree traversals, and dynamic programming."
  }
];

window.App = App;
