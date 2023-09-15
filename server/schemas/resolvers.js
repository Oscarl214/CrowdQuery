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
        const forms = await Form.find()
          .populate({
            path: 'submissions',
          })
          .sort({ createdAt: -1 });
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
    addForm: async (parent, { title, description }, context) => {
      if (context.administrator) {
        const newForm = new Form({
          title,
          description,
        });

        const form = await newForm.save();

        await Administrator.findByIdAndUpdate(
          context.administrator._id,
          { $push: { forms: form._id } },
          { new: true }
        );

        return form;
      }
      throw new AuthenticationError('Not logged in');
    },
    addSubmission: async (parent, { formId, content }) => {
      try {
        const form = await Form.findById(formId);

        if (!form) {
          throw new Error('Form not found');
        }

        if (!content || content.trim() === '') {
          throw new Error('Content is required for a submission');
        }

        const newSubmission = new Submission({
          formId: formId,
          content: content,
        });

        const submission = await newSubmission.save();

        form.submissions.push(submission._id);

        await form.save();

        return submission;
      } catch (error) {
        throw new Error('Failed to add Submission: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
