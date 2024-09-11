const mongoose = require('mongoose');

const SubmissionSchema = mongoose.Schema({
  instanceId: {
    type: String,
    required: true
  },
  ranking: {
    type: [Number],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  yoe: {
    type: Number,
    required: true
  },
  pyoe: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('submission', SubmissionSchema);
