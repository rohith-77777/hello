const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve index.html and test.html

let submissions = [];

// Serve signup page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Missing fields");
  }

  submissions.push({ name, email, password });

  console.log("✅ New Submission:", { name, email, password });

  // Always respond with 200 OK
  res.status(200).send("Form submitted successfully");
});

// Show all submissions
app.get("/submissions", (req, res) => {
  let html = `
    <h1>All Submissions</h1>
    <table border="1" cellpadding="10" cellspacing="0">
      <tr><th>Name</th><th>Email</th><th>Password</th></tr>
  `;
  submissions.forEach(s => {
    html += `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.password}</td></tr>`;
  });
  html += "</table>";
  res.send(html);
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

