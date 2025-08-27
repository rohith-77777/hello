const express = require("express");
const path = require("path");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Serve static files (index.html, test.html, etc.)
app.use(express.static(__dirname));

// In-memory storage for submissions
let submissions = [];

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Missing fields");
  }

  submissions.push({ name, email, password });

  console.log("✅ New Submission:", { name, email, password });

  // Respond with success
  res.status(200).send("Form submitted successfully");
});

// Page to view all submissions
app.get("/submissions", (req, res) => {
  let html = `
    <h1>All Submissions</h1>
    <table border="1" cellpadding="10" cellspacing="0">
      <tr><th>Name</th><th>Email</th><th>Password</th></tr>
  `;

  submissions.forEach(sub => {
    html += `<tr><td>${sub.name}</td><td>${sub.email}</td><td>${sub.password}</td></tr>`;
  });

  html += "</table>";
  res.send(html);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📌 View submissions at http://localhost:${PORT}/submissions`);
});

