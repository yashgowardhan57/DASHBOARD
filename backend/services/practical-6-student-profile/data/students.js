const students = [
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
    about: "A thoughtful problem-solver who likes turning ideas into simple digital experiences.",
    accent: "plum"
  },
  {
    id: 5,
    name: "Kabir Verma",
    initials: "KV",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    rollNumber: "CS-2317",
    email: "kabir.verma@example.com",
    phone: "+91 98765 12005",
    skills: ["Node.js", "SQL", "Git"],
    about: "Enjoys backend development, collaborative projects, and learning new tools.",
    accent: "sage"
  },
  {
    id: 6,
    name: "Isha Nair",
    initials: "IN",
    course: "B.Tech Electronics",
    year: "2nd Year",
    rollNumber: "EC-2409",
    email: "isha.nair@example.com",
    phone: "+91 98765 12006",
    skills: ["Arduino", "C", "Problem Solving"],
    about: "Interested in electronics, practical experiments, and building useful prototypes.",
    accent: "sand"
  }
];

module.exports = students;
module.exports.default = students;
module.exports.getAllStudents = () => students;
module.exports.getStats = () => ({
  totalStudents: students.length,
  departmentsCount: 3,
  skillsCount: new Set(students.flatMap(s => s.skills || [])).size
});
