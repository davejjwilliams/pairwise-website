const express = require('express');

const app = express();

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
