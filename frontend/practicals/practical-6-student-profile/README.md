# Student Profile Card — React + Node.js

A beginner-friendly college portal project demonstrating React, JSX, functional components, and props. Includes a React frontend and Express backend with sample student data.

## Requirements
- Node.js 18+ (recommended)
- npm

## Run locally
Open a terminal in this folder and run:

```bash
npm run install:all
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:5000/api/students

The frontend uses Vite's development proxy to call the backend.

## Project structure
- `frontend/` — React UI, reusable `StudentCard` component, JSX and props
- `backend/` — Express API returning student records
- `backend/data/students.js` — editable sample student data

## Website content
- Six sample student profile cards with skills and contact details
- Search by name, course, skill, or roll number
- Academic-program filter chips and live directory statistics
- Campus-life highlights and sample student activities/events
- A React learning section explaining JSX, components, props, and state

The activities and student records are demonstration content; replace them with approved college details before publishing.

## Customize
Edit `backend/data/students.js` to change the sample students. This demo stores sample data in a JavaScript file; it does not use a database or persistent student editing.
## Responsive layout
The layout includes responsive CSS breakpoints for wide desktop screens, laptops, tablets, small phones, and narrow 320px-width screens. The student grid adapts from three columns to two columns and then a single column on phones. Navigation, filters, search, events, statistics, and the project explanation also adjust for smaller screens. Touch-friendly controls and reduced-motion preferences are supported. The HTML page includes a viewport meta tag for mobile browser scaling.
