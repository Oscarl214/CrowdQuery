const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

//My Form Schema with a title, description, createdAt,and url field
//and a submissions array field that references the Submission Schema

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
    url: {
      type: String,
      unique: true,
      default: function () {
        return `https://crowdquery-139561294e07.herokuapp.com/forms/${this._id}`;
      },
    },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
