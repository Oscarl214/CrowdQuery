const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

//My Submission Schema with a reference to the form it belongs to, the content,
// and a createdAt field
const submissionSchema = new Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toISOString().split('T')[0],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
