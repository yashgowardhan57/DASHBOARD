# Practical 3: Develop a Personal Portfolio Website with Modern CSS

| Experiment | Title | Real-Life Scenario | Concepts Covered |
| :---: | :--- | :--- | :--- |
| **3** | **Develop a Personal Portfolio Website with Modern CSS** | A job applicant wants a professional portfolio showcasing projects with interactive UI. | **CSS Variables, Pseudo Classes, Pseudo Elements, Custom Properties** |

---

## 📌 Project Overview
This project implements **Practical 3** for **Yash Gowardhan's** personal developer portfolio, precisely matching the UI layout, border lines, typography sizing, section order, and content from the reference screenshots.

- **Theme**: Dark Minimalist Portfolio (Dark Charcoal Background `#15161a`, Crisp Border Lines, Off-white & Muted Typography, Clean Outlined Cards & Badges)
- **Border Lines**:
  - Sticky Header with 1px solid bottom border (`rgba(255, 255, 255, 0.22)`)
  - Continuous divider lines inside sections matching the reference sheets:
    - Divider above the 3-column stats in **About Me**
    - Divider below the skill tags in **Skills**
    - Divider above the copyright in **Let's Connect**
  - Crisp 1px border outlines on Project Cards (`rgba(255, 255, 255, 0.24)`), Skill Badges (`rgba(255, 255, 255, 0.26)`), and Outlined Action Buttons (`rgba(255, 255, 255, 0.35)`).
- **Proportions & Viewport Sizing**:
  - Each section configured with `min-height: calc(100vh - 72px)` to fill the screen view cleanly when scrolled to, exactly matching the 5 full-screen photo views.
  - Container width set to `1040px` with responsive breakpoints for Tablet (`<= 920px`) and Mobile (`<= 640px`).
- **Technologies Used**: HTML5, Modern CSS3, Vanilla JavaScript (IntersectionObserver active link tracking & mobile menu).

---

## 📁 File Structure
```
d:\dash\practical-3\
│
├── index.html         # Semantic HTML5 portfolio webpage
├── styles.css         # Modern CSS with custom properties & pseudo-selectors
├── script.js          # Interactive JavaScript (navigation, active link observer)
└── README.md          # Practical manual report & documentation
```

---

## 🧩 Sections Included (Strictly as per Reference UI)

1. **Header / Navigation Bar**:
   - Logo: `Yash.`
   - Navigation Links: `Home`, `About`, `Skills`, `Projects`, `Contact`
   - Sticky positioning with bottom border line and active link underline indicator.

2. **Hero Section (`#home`)**:
   - Eyebrow: `WELCOME TO MY PORTFOLIO`
   - Name Heading: `Yash Gowardhan` (52px, bold)
   - Role Subheading: `Web Developer & Programmer`
   - Description: `I am a passionate developer who enjoys creating clean, responsive and user-friendly websites. I am interested in web development, programming and emerging technologies.`
   - Action Buttons: `View My Work` and `Contact Me` with crisp outlines.

3. **About Me Section (`#about`)**:
   - Title: `About Me`
   - Paragraph 1: `I am a Computer Science student with an interest in software development and modern web technologies. I enjoy learning new technologies and applying them to real-world projects.`
   - Paragraph 2: `My focus is on building websites that are simple, responsive and easy to use. I also enjoy problem solving and improving my programming skills.`
   - Horizontal Divider Line
   - 3-Column Profile Meta Details:
     - **EDUCATION**: `Computer Science Student`
     - **INTEREST**: `Web Development & AI`
     - **LOCATION**: `India`

4. **Skills Section (`#skills`)**:
   - Title: `Skills`
   - Subtitle: `Some of the technologies and programming skills I use to develop my projects.`
   - 8 Skill Tags:
     - `HTML5`, `CSS3`, `JavaScript`, `C++`, `Python`, `Git & GitHub`, `Responsive Design`, `Problem Solving`
   - Horizontal Divider Line directly below skill tags.

5. **Projects Section (`#projects`)**:
   - Title: `Projects`
   - Subtitle: `A few projects that demonstrate my interest in web development, programming and technology.`
   - 3 Outlined Project Cards:
     - **Project 01**: `E-Commerce Product Catalog`
       - Description: *A responsive product catalog website designed for an online shopping platform. It includes product cards, navigation and a responsive layout.*
       - Tech Stack: `HTML • CSS • Responsive Design`
     - **Project 02**: `AI Attendance System`
       - Description: *A smart attendance system concept that uses face recognition technology to identify students and automatically record their attendance.*
       - Tech Stack: `Python • AI • Computer Vision`
     - **Project 03**: `AI Shorts Generator`
       - Description: *A web application concept that analyzes long videos and generates short-form videos suitable for YouTube Shorts and Reels.*
       - Tech Stack: `AI • Web Development • Video Processing`

6. **Let's Connect Section (`#contact`)**:
   - Title: `Let's Connect`
   - Description: `I am always interested in learning, collaborating and working on new projects. Feel free to contact me if you would like to discuss an idea or opportunity.`
   - Contact Info:
     - `Email: yash@example.com`
     - `Location: India`
   - Action Button: `Send Me an Email`
   - Horizontal Divider Line above footer
   - Footer: `© 2026 Yash Gowardhan. All Rights Reserved`
