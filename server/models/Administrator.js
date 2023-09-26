const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//My Administrator Modal with a name,email,password,
//and forms field that references the Form Schema
const AdministratorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
AdministratorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
AdministratorSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// when we query a administrator, we'll get formCount to let us know how many total forms a Administrator has
AdministratorSchema.virtual('formCount').get(function () {
  return this.forms.length;
});

const Administrator = mongoose.model('Administrator', AdministratorSchema);

module.exports = Administrator;
