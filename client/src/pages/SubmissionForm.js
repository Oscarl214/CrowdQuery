import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FORM_QUERY } from '../utils/queries';
import { ADD_SUBMISSION } from '../utils/mutations';

import SVG from './S-SVG.svg';
const SubmissionForm = () => {
  const { formId } = useParams();
  console.log('formId:', formId);

  const { loading, error, data } = useQuery(FORM_QUERY, {
    variables: { formId },
  });

  const [addSubmission] = useMutation(ADD_SUBMISSION);
  const [content, setContent] = useState('');

  const [title, setFormTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  console.log('formId:', formId);
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  useEffect(() => {
    if (data && data.form) {
      const { title, description } = data.form;
      setDescription(description);
      setFormTitle(title);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = document.getElementById('content').value;

    try {
      const { data } = await addSubmission({
        variables: {
          formId,
          content,
        },
      });
      setSubmissionStatus('success');
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  let formContent;

  if (submissionStatus === 'success') {
    formContent = (
      <div>
        <h2 className="font-custom text-4xl text-primary">
          Your Feedback was Submitted!
        </h2>
        <h3 className="font-custom text-4xl text-primary mt-5">
          Thanks for Sharing!
        </h3>
        <p className="font-custom text-2xl text-white mt-6">
          Please re-use the link if you would like to add some more!
        </p>
      </div>
    );
  } else if (submissionStatus === 'error') {
    formContent = (
      <div>
        <h2>Error submitting feedback.</h2>
        <p>Please try again later.</p>
      </div>
    );
  } else {
    formContent = (
      <div className="w-full max-w-5xl p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8  dark:border-gray-700">
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <p className="font-custom text-lg">
              Someone wants your Feedback! Your response is completely
              anonymous!
            </p>
            <label htmlFor="content "></label>
            <textarea
              id="content"
              className="w-full border border-black my-5"
              placeholder="FeedBack Goes here..."
            />

            <button
              type="submit"
              class="w-32 my-5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${SVG})` }}
    >
      <div className="w-full max-w-5xl p-4 text-center bg-background border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex flex-col items-center">
          {' '}
          {/* Center horizontally and vertically */}
          <h5 className="mb-2 text-7xl font-bold text-text">{title}</h5>
          <p className="mb-5 text-text text-5xl ">{description}</p>
          <div>{formContent}</div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;

//   let formContent;

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const form = data.form;
//   console.log('Form Data:', form);

//   return (
//     <div
//       className="min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center"
//       style={{ backgroundImage: `url(${SVG})` }}
//     >
//       <div className="flex-col align-top">
//         <h5 className="mb-2 text-7xl font-bold text-gray-900 dark:text-white">
//           {title}
//         </h5>
//         <p className="mb-5  text-text font-custom text-5xl m:text-lg">
//           {description}
//         </p>
//       </div>
{
  /* <div className="w-full max-w-5xl p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8  dark:border-gray-700">
  <div className="flex flex-col items-center">
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <p className="font-custom text-lg">
        Someone wants your Feedback! Your response is completely anonymous!
      </p>
      <label htmlFor="content "></label>
      <textarea
        id="content"
        className="w-full border border-black my-5"
        placeholder="FeedBack Goes here..."
      />

      <button
        type="submit"
        class="w-32 my-5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
      >
        Submit
      </button>
    </form>
  </div>
</div>; */
}
//     </div>
//   );
// };

// export default SubmissionForm;
