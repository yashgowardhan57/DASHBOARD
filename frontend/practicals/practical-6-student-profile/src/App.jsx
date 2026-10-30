import { useEffect, useMemo, useState } from "react";
import {
  Search, GraduationCap, Users, BookOpen, ArrowUpRight, LoaderCircle,
  Code2, Layers3, BriefcaseBusiness, CalendarDays, Lightbulb, HeartHandshake,
  Sparkles, Laptop, Rocket, Target, ChevronRight
} from "lucide-react";
import StudentCard from "./components/StudentCard.jsx";

const departments = ["All students", "Information Technology", "Computer Science", "Electronics"];
const campusHighlights = [
  { icon: Laptop, number: "01", title: "Build & create", text: "Turn classroom concepts into small apps, prototypes, and team projects.", label: "PROJECT CULTURE" },
  { icon: HeartHandshake, number: "02", title: "Learn together", text: "Share ideas, support classmates, and learn from different perspectives.", label: "STUDENT COMMUNITY" },
  { icon: Rocket, number: "03", title: "Show your work", text: "Document what you build and make your skills easier for others to discover.", label: "GROWTH MINDSET" }
];
const events = [
  { date: "06 NOV", type: "WORKSHOP", title: "Web Development Lab", description: "A hands-on session for building your first component-based page." },
  { date: "12 NOV", type: "COMMUNITY", title: "Peer Learning Circle", description: "Connect with other learners and exchange practical study tips." },
  { date: "19 NOV", type: "SHOWCASE", title: "Mini Project Showcase", description: "Share a small project, explain your process, and celebrate progress." }
];

const defaultStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    course: "B.Tech Information Technology",
    year: "3rd Year",
    rollNumber: "IT-2301",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 12001",
    skills: ["React", "JavaScript", "CSS"],
    about: "Curious developer who enjoys building clean, useful web applications.",
    accent: "plum"
  },
  {
    id: 2,
    name: "Ananya Patel",
    initials: "AP",
    course: "B.Tech Computer Science",
    year: "2nd Year",
    rollNumber: "CS-2408",
    email: "ananya.patel@example.com",
    phone: "+91 98765 12002",
    skills: ["Python", "UI Design", "HTML"],
    about: "Interested in user experience, creative problem-solving, and technology.",
    accent: "sage"
  },
  {
    id: 3,
    name: "Rohan Deshmukh",
    initials: "RD",
    course: "B.Tech Electronics",
    year: "4th Year",
    rollNumber: "EC-2215",
    email: "rohan.deshmukh@example.com",
    phone: "+91 98765 12003",
    skills: ["IoT", "C++", "ESP32"],
    about: "Enjoys exploring embedded systems and connecting hardware with software.",
    accent: "sand"
  },
  {
    id: 4,
    name: "Meera Kulkarni",
    initials: "MK",
    course: "B.Tech Information Technology",
    year: "2nd Year",
    rollNumber: "IT-2412",
    email: "meera.kulkarni@example.com",
    phone: "+91 98765 12004",
    skills: ["Figma", "React", "Teamwork"],
    about: "Design-minded student passionate about wireframing, accessibility, and modern interfaces.",
    accent: "plum"
  },
  {
    id: 5,
    name: "Kabir Verma",
    initials: "KV",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    rollNumber: "CS-2321",
    email: "kabir.verma@example.com",
    phone: "+91 98765 12005",
    skills: ["Java", "SQL", "Git"],
    about: "Focusing on structured problem-solving, backend logic, and software engineering foundations.",
    accent: "sand"
  },
  {
    id: 6,
    name: "Pooja Nair",
    initials: "PN",
    course: "B.Tech Electronics",
    year: "1st Year",
    rollNumber: "EC-2504",
    email: "pooja.nair@example.com",
    phone: "+91 98765 12006",
    skills: ["Robotics", "Arduino", "Problem Solving"],
    about: "First-year explorer interested in sensors, robotics clubs, and maker-space activities.",
    accent: "sage"
  }
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All students");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/students")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load students.");
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setError("");
      })
      .catch(() => {
        setStudents(defaultStudents);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = !term || [student.name, student.course, student.rollNumber, ...student.skills]
        .some((value) => value.toLowerCase().includes(term));
      const matchesDepartment = department === "All students" || student.course.includes(department);
      return matchesSearch && matchesDepartment;
    });
  }, [students, search, department]);

  const skillCount = useMemo(() => new Set(students.flatMap((student) => student.skills)).size, [students]);
  const programCount = useMemo(() => new Set(students.map((student) => student.course)).size, [students]);

  return (
    <main className="page-shell">
      <nav className="topbar">
        <a className="brand" href="#home" aria-label="Campus home">
          <span className="brand-icon"><GraduationCap size={22} /></span>
          <span>campus<span className="brand-dot">.</span></span>
        </a>
        <div className="nav-right"><a href="#directory">Students</a><a href="#campus-life">Campus life</a><a href="#events">Activities</a><span className="nav-avatar">C</span></div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> THE CAMPUS COMMUNITY</span>
          <h1>Every student has<br />a <em>story.</em></h1>
          <p className="hero-description">Meet the people who make our campus a place to learn, build, and grow together. Explore student profiles, interests, and the skills they are developing.</p>
          <div className="hero-actions"><a className="primary-link" href="#directory">Explore students <ArrowUpRight size={16} /></a><a className="text-link" href="#about-project">About this project <ChevronRight size={15} /></a></div>
          <div className="hero-meta"><span><Users size={17} /> Student directory</span><span><BookOpen size={17} /> Academic profiles</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-ring ring-one" /><div className="art-ring ring-two" />
          <div className="art-card art-card-back"><span className="art-lines" /><span className="art-mini-avatar">S</span></div>
          <div className="art-card art-card-front"><span className="art-spark">✳</span><div className="art-avatar">A</div><span className="art-line long" /><span className="art-line short" /><div className="art-tags"><i /><i /><i /></div></div>
          <div className="art-note"><span className="note-check">✓</span><span><strong>Made for connection</strong><small>People first, always.</small></span></div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Directory summary">
        <div className="stat-cell"><span className="stat-icon"><Users size={18} /></span><div><strong>{loading ? "—" : String(students.length).padStart(2, "0")}</strong><span>STUDENT PROFILES</span></div></div>
        <div className="stat-cell"><span className="stat-icon"><Layers3 size={18} /></span><div><strong>{loading ? "—" : String(programCount).padStart(2, "0")}</strong><span>ACADEMIC PROGRAMS</span></div></div>
        <div className="stat-cell"><span className="stat-icon"><Sparkles size={18} /></span><div><strong>{loading ? "—" : String(skillCount).padStart(2, "0")}</strong><span>SKILLS SHARED</span></div></div>
        <div className="stat-caption">A growing directory of interests, skills, and stories.</div>
      </section>

      <section className="directory-section" id="directory">
        <div className="section-heading">
          <div><span className="section-kicker">GET TO KNOW US</span><h2>Student directory<span className="heading-period">.</span></h2><p>Discover people by name, academic program, skill, or roll number.</p></div>
          <div className="student-count"><strong>{String(filteredStudents.length).padStart(2, "0")}</strong><span>SHOWING</span></div>
        </div>
        <div className="directory-tools">
          <div className="search-box"><Search size={18} /><input aria-label="Search students" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, course, skill or roll number..." /><kbd>/</kbd></div>
          <span className="results-label">{filteredStudents.length} of {students.length} profiles</span>
        </div>
        <div className="filter-row" aria-label="Filter by academic program">
          {departments.map((item) => <button key={item} type="button" className={`filter-chip ${department === item ? "selected" : ""}`} onClick={() => setDepartment(item)}>{item}</button>)}
        </div>
        {loading ? (
          <div className="state-message"><LoaderCircle className="spinner" size={22} /> Loading student profiles…</div>
        ) : error ? (
          <div className="state-message error-message">{error}</div>
        ) : filteredStudents.length ? (
          <div className="student-grid">{filteredStudents.map((student) => <StudentCard key={student.id} student={student} />)}</div>
        ) : (
          <div className="state-message">No students match your filters. Try another search or select “All students”.</div>
        )}
        <p className="demo-caption">Demonstration data is included for this academic project. Replace the sample details with approved college data before publishing.</p>
      </section>

      <section className="campus-section" id="campus-life">
        <div className="section-heading"><div><span className="section-kicker">MORE THAN A PROFILE</span><h2>Campus life, in three ideas<span className="heading-period">.</span></h2><p>A student portal can highlight what students learn, make, and share.</p></div><span className="section-side-note">LEARN · COLLABORATE · GROW</span></div>
        <div className="highlight-grid">{campusHighlights.map(({ icon: Icon, number, title, text, label }) => <article className="highlight-card" key={number}><div className="highlight-top"><span className="highlight-icon"><Icon size={21} /></span><span>{number}</span></div><span className="highlight-label">{label}</span><h3>{title}</h3><p>{text}</p><span className="highlight-bottom"><ArrowUpRight size={17} /></span></article>)}</div>
      </section>

      <section className="events-section" id="events">
        <div className="section-heading"><div><span className="section-kicker">IDEAS IN ACTION</span><h2>Activities & events<span className="heading-period">.</span></h2><p>Example activities you can replace with real college announcements.</p></div><span className="events-badge"><CalendarDays size={15} /> SAMPLE SCHEDULE</span></div>
        <div className="events-list">{events.map((event) => <article className="event-row" key={event.title}><div className="event-date">{event.date.split(" ")[0]}<span>{event.date.split(" ")[1]}</span></div><div className="event-copy"><span className="event-type">{event.type}</span><h3>{event.title}</h3><p>{event.description}</p></div><span className="event-arrow"><ArrowUpRight size={18} /></span></article>)}</div>
      </section>

      <section className="about-project" id="about-project">
        <div className="about-heading"><span className="section-kicker">THE PROJECT BEHIND THE PAGE</span><h2>React concepts,<br /><em>made visible.</em></h2><p>This student profile portal demonstrates how small, reusable pieces can work together to create a consistent interface.</p></div>
        <div className="concept-list">
          <article className="concept-item"><span className="concept-number">01</span><span className="concept-icon"><Code2 size={19} /></span><div><h3>JSX</h3><p>Write UI markup inside JavaScript using a clear, component-friendly syntax.</p></div></article>
          <article className="concept-item"><span className="concept-number">02</span><span className="concept-icon"><Layers3 size={19} /></span><div><h3>Functional components</h3><p>Build the interface from reusable pieces such as <code>StudentCard</code>.</p></div></article>
          <article className="concept-item"><span className="concept-number">03</span><span className="concept-icon"><BriefcaseBusiness size={19} /></span><div><h3>Props</h3><p>Pass each student object into the card so one component can display different profiles.</p></div></article>
          <article className="concept-item"><span className="concept-number">04</span><span className="concept-icon"><Target size={19} /></span><div><h3>State & rendering</h3><p>Use React state for search and filters, then render the matching list of students.</p></div></article>
        </div>
      </section>

      <section className="learning-note">
        <div className="learning-icon"><Lightbulb size={22} /></div><div><span className="section-kicker">NEXT STEP</span><h3>Make it your college's directory.</h3><p>Update the student sample data, add your college name and logo, and replace the example events with verified announcements. The API and UI are separated to make future changes easier.</p></div><a className="note-arrow" href="#home" aria-label="Back to top"><ArrowUpRight size={21} /></a>
      </section>

      <footer><a className="brand footer-brand" href="#home"><span className="brand-icon"><GraduationCap size={19} /></span><span>campus<span className="brand-dot">.</span></span></a><span>Student Profile Card Project · React + Express</span><span>Learn. Build. Improve.</span></footer>
    </main>
  );
}
