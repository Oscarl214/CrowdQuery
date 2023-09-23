import { gql } from '@apollo/client';

// export const

export const ADMINISTRATOR_QUERY = gql`
  query getAdministrator {
    Administrator {
      _id
      name
      email
      forms {
        _id
        title
        description
        createdAt
        url
        submissions {
          _id
          formId
          content
          createdAt
        }
      }
    }
  }
`;

export const FORMS_QUERY = gql`
  query getForms {
    forms {
      _id
      title
      description
      createdAt
      url
      submissions {
        _id
        formId
        content
        createdAt
      }
    }
  }
`;

export const FORM_QUERY = gql`
  query getForm($formId: ID!) {
    form(formId: $formId) {
      _id
      title
      description
      createdAt
      url
      submissions {
        _id
        formId
        content
        createdAt
      }
    }
  }
`;

export const SUBMISSIONS_QUERY = gql`
  query getSubmissions {
    Submission {
      _id
      formId
      content
      createdAt
    }
  }
`;
