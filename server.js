const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve index.html, test.html, etc.

let submissions = []; // store all submissions in memory

// Serve signup form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;

  // Save submission
  submissions.push({ name, email, password });

  console.log("✅ New Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  res.send(`Received → Name: ${name}, Email: ${email}, Password: ${password}`);
});

// Page to view all submissions
app.get("/submissions", (req, res) => {
  let html = `
    <h1>All Submissions</h1>
    <table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <th>Name</th><th>Email</th><th>Password</th>
      </tr>
  `;
  submissions.forEach(s => {
    html += `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.password}</td></tr>`;
  });
  html += "</table>";
  res.send(html);
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
  console.log("📌 View submissions at http://localhost:3000/submissions");
});

