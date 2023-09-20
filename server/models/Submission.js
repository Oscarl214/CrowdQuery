const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
