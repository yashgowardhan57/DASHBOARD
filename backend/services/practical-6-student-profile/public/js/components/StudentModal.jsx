// Reusable Functional Component: StudentModal
// Detailed modal view when a student card is inspected

function StudentModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close profile details"
        >
          &times;
        </button>

        <div className="modal-header-profile">
          <div className="modal-avatar">
            {student.initials || student.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-walnut)', lineHeight: 1.2 }}>
              {student.name}
            </h2>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              Roll Number: {student.id}
            </div>
            <span className="dept-badge" style={{ marginTop: '0.4rem' }}>
              {student.department} &bull; {student.yearLevel}
            </span>
          </div>
        </div>

        {student.motto && (
          <div className="student-motto" style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            Academic Motto: &ldquo;{student.motto}&rdquo;
          </div>
        )}

        <div className="modal-meta-grid">
          <div className="modal-meta-cell">
            <span className="cell-label">Degree Program</span>
            <span className="cell-value">{student.course}</span>
          </div>
          <div className="modal-meta-cell">
            <span className="cell-label">Academic Year</span>
            <span className="cell-value">{student.year}</span>
          </div>
          <div className="modal-meta-cell">
            <span className="cell-label">Institutional Email</span>
            <span className="cell-value" style={{ wordBreak: 'break-all' }}>{student.email}</span>
          </div>
          <div className="modal-meta-cell">
            <span className="cell-label">College Affiliation</span>
            <span className="cell-value">{student.college}</span>
          </div>
          <div className="modal-meta-cell">
            <span className="cell-label">Core Specialization Focus</span>
            <span className="cell-value">{student.focus}</span>
          </div>
          <div className="modal-meta-cell">
            <span className="cell-label">Cumulative Performance</span>
            <span className="cell-value">CGPA: {student.gpa} &bull; {student.attendance} Attd.</span>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <h4 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
            Technical Competencies &amp; Skills ({student.skills ? student.skills.length : 0})
          </h4>
          <div className="skills-container">
            {(student.skills || []).map((skill, index) => (
              <span key={index} className="skill-pill" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {student.bio && (
          <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'var(--color-isabelline)', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <strong>Academic Biography:</strong> {student.bio}
          </div>
        )}
      </div>
    </div>
  );
}

window.StudentModal = StudentModal;
