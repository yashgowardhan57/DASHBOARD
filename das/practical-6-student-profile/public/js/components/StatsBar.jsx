// Reusable Functional Component: StatsBar
// Demonstrates JSX, Functional Components, and Props

function StatsBar({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-banner">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">&#128101;</div>
            <div className="stat-meta">
              <span className="stat-num">{stats.totalStudents || 0}</span>
              <span className="stat-title">Enrolled Scholars</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">&#127891;</div>
            <div className="stat-meta">
              <span className="stat-num">{stats.departmentsCount || 0}</span>
              <span className="stat-title">Academic Departments</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">&#127942;</div>
            <div className="stat-meta">
              <span className="stat-num">{stats.averageGpa || '0.00'}</span>
              <span className="stat-title">Average Cumulative CGPA</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">&#128337;</div>
            <div className="stat-meta">
              <span className="stat-num">{stats.averageAttendance || '0%'}</span>
              <span className="stat-title">Mean Term Attendance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.StatsBar = StatsBar;
