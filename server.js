const express = require('express');
const connectDB = require('./config/db');
const { check, validationResult } = require('express-validator');

const sweData = require('./dataset-verified.json');
const explData = require('./patch-explanations.json');

const app = express();

// Connect DB
connectDB();

app.use(express.json({ extended: false }));

const Submission = require('./models/Submission.js');

app.post(
  '/api/patch',
  [
    check('instanceId', 'instanceId is required').not().isEmpty(),
    check('explA', 'explA is required').not().isEmpty(),
    check('explB', 'explB is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({
      msg: 'Retrieve patch and explanations from static JSON database.'
    });
  }
);

app.post(
  '/api/end',
  [
    check('instanceId', 'instanceId is required').not().isEmpty(),
    check('ranking', 'ranking is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('yoe', 'yoe is required').not().isEmpty(),
    check('pyoe', 'pyoe is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({
      msg: 'Update databse with user ranking for explanations & their information.'
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
