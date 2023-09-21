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
      }
    }
  }
`;

export const FORM_QUERY = gql`
  query getForm($formID: ID!) {
    form(formID: $formID) {
      _id
      title
      description
      createdAt
      url
      submissions {
        _id
        formId
        content
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
    }
  }
`;
