const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Submission {
    _id: ID!
    formId: ID!
    content: String!
  }
  type Form {
    _id: ID!
    title: String!
    description: String!
    createdAt: String!
    url: String!
    submissions: [Submission]
  }
  type Administrator {
    _id: ID!
    name: String!
    email: String!
    password: String!
    forms: [Form]
  }

  type Auth {
    token: ID
    administrator: Administrator
  }

  type Query {
    administrator: Administrator
    forms: [Form]
    form(formID: ID!): Form
    submissions(formId: ID!): [Submission]
    submission(SubmissionID: ID!): Submission
  }

  type Mutation {
    addAdministrator(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addForm(title: String!, description: String!): Form
    addSubmission(formId: ID!, content: String!): Submission
  }
`;

module.exports = typeDefs;
