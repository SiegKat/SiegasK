const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); // Enable JSON parsing
app.use(express.json());

// Add a phone number
app.post('/api/numbers', async (req, res) => {
  const { number, carrier, location } = req.body;
  try {
    // Check if the number already exists
    const existingNumber = await pool.query(
      'SELECT * FROM phone_numbers WHERE number = $1',
      [number]
    );

    if (existingNumber.rows.length > 0) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

    // Insert the new number
    const result = await pool.query(
      'INSERT INTO phone_numbers (number, carrier, location) VALUES ($1, $2, $3) RETURNING *',
      [number, carrier, location]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to add phone number' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});


