// Reusable Functional Component: StudentCard
// Core Requirement for Practical 6: Components, JSX, Props, and State Flow

function StudentCard({ student, onSelectStudent }) {
  if (!student) return null;

  return (
    <article className="student-card" id={`card-${student.id}`}>
      <div className="card-top">
        <div className="student-avatar" aria-label={`Avatar for ${student.name}`}>
          {student.initials || student.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="card-identity">
          <h3 className="student-name">{student.name}</h3>
          <div className="student-roll">{student.id}</div>
          <span className="dept-badge">{student.department}</span>
        </div>
      </div>

      <div className="student-course-info">
        <div><strong>Course:</strong> {student.course}</div>
        <div><strong>Level:</strong> {student.year}</div>
      </div>

      {student.motto && (
        <div className="student-motto">
          &ldquo;{student.motto}&rdquo;
        </div>
      )}

      {/* Skills Pill Badges */}
      <div className="skills-container" aria-label="Student core competencies">
        {(student.skills || []).slice(0, 4).map((skill, index) => (
          <span key={index} className="skill-pill">
            {skill}
          </span>
        ))}
        {student.skills && student.skills.length > 4 && (
          <span className="skill-pill more">
            +{student.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric-item">
          <span className="metric-label">CGPA</span>
          <span className="metric-val">{student.gpa}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Attendance</span>
          <span className="metric-val">{student.attendance}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn-view-profile"
        onClick={() => onSelectStudent(student)}
        aria-label={`Open detailed profile for ${student.name}`}
      >
        <span>View Academic Profile</span>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </article>
  );
}

window.StudentCard = StudentCard;
