import { gql } from '@apollo/client';

//My Login Mutation that allows me to check for a admin with provided email and password
//get their token and id in return
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      administrator {
        _id
      }
    }
  }
`;

//My mutation that lets me sign up a admin
//takes their provided name,email, and password and inputs it into the database
//provides them a token and their id
export const ADD_ADMINISTRATOR = gql`
  mutation addAdministrator(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addAdministrator(name: $name, email: $email, password: $password) {
      token
      administrator {
        _id
      }
    }
  }
`;

//Adding a form based on provided title and description
//in return creates all fields and provided content into the database
export const ADD_FORM = gql`
  mutation addForm($title: String!, $description: String!) {
    addForm(title: $title, description: $description) {
      _id
      title
      description
      createdAt
      url
    }
  }
`;

//Adding a submission based on provided formId and then the content of the sub
//in return creates all fields and provided content into the database
export const ADD_SUBMISSION = gql`
  mutation addSubmission($formId: ID!, $content: String!) {
    addSubmission(formId: $formId, content: $content) {
      _id
      content
      createdAt
    }
  }
`;

export const REMOVE_FORM = gql`
  mutation removeForm($formId: ID!) {
    removeForm(formId: $formId)
  }
`;
