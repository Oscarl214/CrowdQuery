const { AuthenticationError } = require('apollo-server-express');
const { Administrator, Form, Submission } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    administrator: async (parent, args, context) => {
      if (context.administrator) {
        const administrator = await Administrator.findById(
          context.administrator._id
        ).populate({
          path: 'forms',
        });
        return administrator;
      }
      throw new AuthenticationError('Not logged in');
    },
    forms: async (parent, args, context) => {
      if (context.administrator) {
        const forms = await Form.find().sort({ createdAt: -1 });
        return forms;
      }
      throw new AuthenticationError('Not logged in');
    },
    submissions: async (parent, { formID }, context) => {
      if (context.administrator) {
        try {
          const submissions = await Submission.find({ formId: formID });
          return submissions;
        } catch (error) {
          throw new Error('No Form Found');
        }
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addAdministrator: async (parent, args) => {
      const administrator = await Administrator.create(args);
      const token = signToken(administrator);
      return { args, token };
    },
    login: async (parent, { email, password }) => {
      //Works via GraphQL
      const administrator = await Administrator.findOne({ email });

      if (!administrator) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await administrator.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(administrator);

      return { token, administrator };
    },
  },
};

module.exports = resolvers;
