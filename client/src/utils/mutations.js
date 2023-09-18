import { gql } from 'apollo-server-express';

// export
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

export const ADD_FORM = gql`
    mutation addForm($title,$description){
        addForm(title: $title, description:$description){
            _id
            title
            description
            createdAt
            url
        }
    }
`;

export const ADD_SUBMISSION = gql`
    mutation addSubmission($formId:ID!, $content){
        addSubmission(formId:$formId, content:$content){
            _id
            content
        }
    }
`;
