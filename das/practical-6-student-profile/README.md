# Practical 6: Student Profile Card Using React Components

**Title:** Develop a Student Profile Card Using React Components  
**Technology:** React, JSX, CSS3, Node.js, and Express.js (No Database)  
**Strict Theme Palette:**
- Isabelline: `#F4F2F0`
- Timberwolf: `#D1CBC7`
- Khaki: `#C3AA97`
- Beaver: `#907564`
- Walnut Brown: `#57514C`  
**Developer:** Yash Gowardhan (B.Tech IT, 3rd Year)

---

## 📖 Overview
*ScholarProfile* is a college student directory dashboard featuring reusable React functional components, JSX syntax, props passing, client-side filtering, and an Express.js REST API backend.

> **Constraint Compliance:** This practical **does not connect to PostgreSQL or any external database**. Sample student records are served locally by Express at `/api/students`.

---

## 🧩 React Component Breakdown for College Viva

1. **`App` Component (`public/js/App.jsx`):**
   - Root stateful functional component.
   - Manages state hooks: `students`, `stats`, `loading`, `search`, `selectedDept`, `selectedYear`, and `selectedStudent`.
   - Fetches data from the Express REST API (`http://localhost:3003/api/students`) with automatic fallback to local dataset.

2. **`StudentCard` Component (`public/js/components/StudentCard.jsx`):**
   - Reusable card component.
   - Receives student data via `props` (`student`, `onSelectStudent`).
   - Renders avatar initials, name, course, roll number, academic year, motto, CGPA, and attendance metrics.

3. **`StudentModal` Component (`public/js/components/StudentModal.jsx`):**
   - Detailed inspection overlay with complete institutional biography, degree programs, and full skill pills.

4. **`StatsBar` Component (`public/js/components/StatsBar.jsx`):**
   - Reusable metrics banner displaying enrolled scholar counts, department tallies, and mean attendance.

---

## 🚀 Setup & Execution Instructions

```bash
# 1. Navigate to directory
cd practical-6-student-profile

# 2. Install dependencies (express, cors)
npm install

# 3. Start Express API and static server
npm start
```

Access in your browser:
- **React Web Portal:** `http://localhost:3003/`
- **Express REST API:** `http://localhost:3003/api/students`
- **Stats API Endpoint:** `http://localhost:3003/api/stats`
- **Direct Static/Dashboard View:** `http://localhost:3000/practical-6-student-profile/index.html`
