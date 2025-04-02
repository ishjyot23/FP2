const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));  // Make sure 'public' contains your HTML file

// Connect to SQLite3 database
const db = new sqlite3.Database("gyanMargDB.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// API to get volunteer count
app.get("/getVolunteerCount", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM user WHERE role = 'volunteer'";
  db.get(query, [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ count: row.count || 0 });
  });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
