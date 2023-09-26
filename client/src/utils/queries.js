import { gql } from '@apollo/client';

///writing queries and mutations on the frontend
// when using GraphQL its essential for efficient data fetching, optimizing performance,
// real-time updates, and ensuring that the frontend gets the precise data
//it needs for different views or components.

//My Admin Query that I use throughout most of my app
//It again fetches the admin that is logged in and their
//forms-->forms content
//Submissions--->Content

//I have access to all this information when I use this query in my components
export const ADMINISTRATOR_QUERY = gql`
  query getAdministrator {
    administrator {
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

//Form query based on formID, I use this query by using the params function in react-dom
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

// export const SUBMISSIONS_QUERY = gql`
//   query getSubmissions {
//     Submission {
//       _id
//       formId
//       content
//       createdAt
//     }
//   }
// `;

// export const FORMS_QUERY = gql`
//   query getForms {
//     forms {
//       _id
//       title
//       description
//       createdAt
//       url
//       submissions {
//         _id
//         formId
//         content
//         createdAt
//       }
//     }
//   }
// `;
