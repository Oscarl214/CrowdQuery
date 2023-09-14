const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const formSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toISOString().split('T')[0],
    },
    administratorCode: {
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

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
