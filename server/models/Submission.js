const mongoose = require('mongoose');

const { Schema, modal } = require('mongoose');

const submissionSchema = new Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    content: {
      message: {
        type: String,
        required: true,
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Submission = mongoose.modal('Submission', submissionSchema);

module.exports = Submission;
