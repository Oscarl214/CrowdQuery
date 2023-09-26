const { AuthenticationError } = require('apollo-server-express');
const { Administrator, Form, Submission } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    //My Administrator query that pulls all data related to the Admin that is logged in
    //Forms and Submissions are only viewable to the person who created the Form
    administrator: async (parent, args, context) => {
      if (context.administrator) {
        const administrator = await Administrator.findById(
          context.administrator._id
        ).populate({
          path: 'forms',
          populate: {
            path: 'submissions',
            model: 'Submission',
          },
        });
        administrator.forms.sort((a, b) => b.createdAt - a.createdAt);
        return administrator;
      }
      throw new AuthenticationError('Not logged in');
    },
    //Form query by ID, this query lets me find information about a specific form by providing the ID
    //as a variable
    form: async (parent, { formId }, context) => {
      if (context.administrator) {
        const form = await Form.findById(formId).populate('submissions');
        return form;
      }
      throw new AuthenticationError('Not logged in');
    },

    //Extra Queries I can use for further development

    // forms: async (parent, args, context) => {
    //   if (context.administrator) {
    //     const forms = await Form.find()
    //       .populate({
    //         path: 'submissions',
    //       })
    //       .sort({ createdAt: -1 });
    //     return forms;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },
    // forms: async (parent, args, context) => {
    //   if (context.administrator) {
    //     // Find forms associated with the administrator
    //     const forms = await Form.find({
    //       _id: { $in: context.administrator.forms },
    //     })
    //       .populate({
    //         path: 'submissions',
    //       })
    //       .sort({ createdAt: -1 });

    //     return forms;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },

    // submissions: async (parent, { formID }, context) => {
    //   if (context.administrator) {
    //     try {
    //       const submissions = await Submission.find({ formId: formID });
    //       return submissions;
    //     } catch (error) {
    //       throw new Error('No Form Found');
    //     }
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },
    // submission: async (parent, { SubmissionID }, context) => {
    //   if (context.administrator) {
    //     try {
    //       const submission = await Submission.findById(SubmissionID);
    //       return submission;
    //     } catch (error) {
    //       throw new Error('No Submission Found');
    //     }
    //   }
    //   throw new AuthenticationError('Not Logged in');
    // },
  },
  Mutation: {
    //this mutation allows me to add a new user based on my token system in place
    addAdministrator: async (parent, args) => {
      const administrator = await Administrator.create(args);
      const token = signToken(administrator);
      return { args, token };
    },
    //my login mutation finds an existing user based on their provided email and password
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
    //my addForm Mutation allows me to add a new form by providing the title and description as input
    //than I also go and push this new form on to the admin that created the form
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
    //my addSubmission Mutation allows anyone to add a new submission by providing content as input
    //We find the specific form to submit to via the form ID
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
    //this remove Form function removes a form if the administrator created the form
    //It then also goes on to remove the formId from their account
    removeForm: async (parent, { formId }, context) => {
      if (context.administrator) {
        try {
          const form = await Form.findById(formId);
          if (!form) {
            throw new ApolloError('Form not found', 'NOT_FOUND');
          }
          const deletedForm = await Form.deleteOne({ _id: formId });

          if (deletedForm.deletedCount === 1) {
            await Administrator.findByIdAndUpdate(
              context.administrator._id,
              { $pull: { forms: formId } },
              { new: true }
            );
            return 'Form deleted successfully';
          } else {
            throw new ApolloError('Form not found', 'NOT_FOUND');
          }
        } catch (error) {
          throw new ApolloError('Error deleting post', 'INTERNAL_SERVER_ERROR');
        }
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
  },
};

module.exports = resolvers;
