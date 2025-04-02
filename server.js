const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to fetch data

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
    res.json({ count: row.count || 0 }); // Return volunteer count
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
