const { AuthenticationError } = require('apollo-server-express');
const { Administrator, Form, Submission } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {},
};

module.exports = resolvers;
