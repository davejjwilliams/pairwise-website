const express = require('express');
const connectDB = require('./config/db');
const sweData = require('./dataset-verified.json');
const explData = require('./patch-explanations.json');

const app = express();

// Connect DB
connectDB();

app.post('/api/patch', (req, res) => {
  res.json({
    msg: 'Retrieve patch and explanations from static JSON database.'
  });
});

app.post('/api/end', (req, res) => {
  res.json({
    msg: 'Update databse with user ranking for explanations & their information.'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
