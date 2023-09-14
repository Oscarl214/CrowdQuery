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
    administratorCode: String!
  }
  type Administrator {
    _id: ID!
    code: String!
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
  }
`;

module.exports = typeDefs;
