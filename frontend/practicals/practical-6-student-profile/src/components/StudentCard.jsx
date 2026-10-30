import { Mail, Phone, GraduationCap, Hash, ArrowUpRight } from "lucide-react";

export default function StudentCard({ student }) {
  return (
    <article className="student-card">
      <div className={`card-cover ${student.accent}`}>
        <span className="profile-label">STUDENT PROFILE</span>
        <span className="avatar" aria-label={`${student.name} initials`}>{student.initials}</span>
        <span className="year-pill">{student.year}</span>
      </div>
      <div className="card-body">
        <div className="student-heading">
          <div>
            <h2>{student.name}</h2>
            <p className="course">{student.course}</p>
          </div>
          <span className="card-arrow"><ArrowUpRight size={18} /></span>
        </div>
        <p className="about">{student.about}</p>
        <div className="detail-list">
          <div><Hash size={16} /><span>{student.rollNumber}</span></div>
          <div><Mail size={16} /><a href={`mailto:${student.email}`}>{student.email}</a></div>
          <div><Phone size={16} /><a href={`tel:${student.phone.replaceAll(" ", "")}`}>{student.phone}</a></div>
        </div>
        <div className="skills">
          {student.skills.map((skill) => <span className="skill" key={skill}>{skill}</span>)}
        </div>
      </div>
      <div className="card-footer">
        <span><GraduationCap size={16} /> Campus directory</span>
        <span className="active-dot">Active</span>
      </div>
    </article>
  );
}