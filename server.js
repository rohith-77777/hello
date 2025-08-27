const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Serve your HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // change index.html to your filename
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;

  // ⚠️ Only for testing (logs password to console)
  console.log("Full Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  res.send(`Received → Name: ${name}, Email: ${email}, Password: ${password}`);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
