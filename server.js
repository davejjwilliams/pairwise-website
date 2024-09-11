const express = require('express');
const connectDB = require('./config/db');
const { check, validationResult } = require('express-validator');
const path = require('path');

const sweData = require('./data/dataset-verified.json');
const explData = require('./data/patch-explanations.json');

const app = express();

// Connect DB
connectDB();

app.use(express.json({ extended: false }));

const Submission = require('./models/Submission.js');

app.post(
  '/api/patch',
  [
    check('instanceId', 'instanceId is required').not().isEmpty(),
    check('idExplA', 'idExplA is required').not().isEmpty(),
    check('idExplB', 'idExplB is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { instanceId, idExplA, idExplB } = req.body;

    // get data from json files
    let patch = '';
    let explIds = [idExplA, idExplB];
    let expls = [];

    for (let i = 0; i <= sweData.length; i++) {
      if (sweData[i]['instance_id'] === instanceId) {
        patch = sweData[i].patch;
        break;
      }
    }

    for (let i = 0; i < explData.length; i++) {
      if (explData[i]['instance_id'] === instanceId) {
        for (let j = 0; j < explIds.length; j++) {
          for (let k = 0; k < explData[i]['explanations'].length; k++) {
            if (explData[i]['explanations'][k]['id'] === explIds[j]) {
              expls.push(explData[i]['explanations'][k]['content']);
              break;
            }
          }
        }
      }
    }

    let out = {
      patch,
      expls
    };

    res.json(out);
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

// Server Static Assets in Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/dist'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
