// Demonstration Student Records for Practical 6 — Academic Portal

const students = [
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
    status: "Active",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Git & GitHub",
      "DSA",
      "System Design"
    ],
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
    status: "Active",
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
    status: "Active",
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
    status: "Active",
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
    status: "Active",
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
    status: "Active",
    skills: ["C++", "C", "Data Structures", "Algorithms", "Object-Oriented Design"],
    bio: "Competitive programmer focusing on algorithmic optimization, tree traversals, and dynamic programming."
  }
];

module.exports = {
  students,
  getAllStudents: function () {
    return students;
  },
  getStudentById: function (id) {
    return students.find(function (s) { return s.id === id; });
  },
  getStats: function () {
    const total = students.length;
    const depts = Array.from(new Set(students.map(function (s) { return s.department; })));
    const avgGpa = (students.reduce(function (acc, s) { return acc + parseFloat(s.gpa); }, 0) / total).toFixed(2);
    const avgAttendance = Math.round(students.reduce(function (acc, s) { return acc + parseInt(s.attendance, 10); }, 0) / total) + '%';
    return {
      totalStudents: total,
      departmentsCount: depts.length,
      departments: depts,
      averageGpa: avgGpa,
      averageAttendance: avgAttendance
    };
  }
};
