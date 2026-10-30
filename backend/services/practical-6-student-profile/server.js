const express = require("express");
const cors = require("cors");
const path = require("path");
const students = require("./data/students");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Health check probe for Dashboard
app.get("/api/health", (req, res) => res.json({ status: "ok", service: "practical-6-student-profile" }));

app.get("/api/students", (req, res) => {
  res.json(students);
});

// Serve frontend if present
app.use(express.static(path.join(__dirname, "..", "..", "..", "frontend", "practicals", "practical-6-student-profile")));

app.listen(PORT, () => {
  console.log(`[Student API] Running on http://localhost:${PORT}`);
});
