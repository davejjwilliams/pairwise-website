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
    // TODO: Complete
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { instanceId, ranking, description, title, yoe, pyoe } = req.body;

    try {
      let submission = new Submission({
        instanceId,
        ranking,
        description,
        title,
        yoe,
        pyoe
      });

      await submission.save();

      res.send(
        'Updated databse with user ranking for explanations & their information.'
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
