const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API: Create Incident
app.post('/api/incidents', (req, res) => {
  const { type, description, severity, location } = req.body;

  const sql = 'INSERT INTO incidents (type, description, severity, location) VALUES (?, ?, ?, ?)';
  db.query(sql, [type, description, severity, location], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      res.status(500).send('Database error');
    } else {
      res.status(201).send('Incident reported successfully');
    }
  });
});

// API: Get All Incidents
app.get('/api/incidents', (req, res) => {
  const sql = 'SELECT * FROM incidents';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Select error:', err);
      res.status(500).send('Database error');
    } else {
      res.status(200).json(result);
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
