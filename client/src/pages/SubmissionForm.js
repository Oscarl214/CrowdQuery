import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FORM_QUERY } from '../utils/queries';
import { ADD_SUBMISSION } from '../utils/mutations';
import SVG from './S-SVG.svg';
import { Button } from 'flowbite-react';

const SubmissionForm = () => {
  const { formId } = useParams();

  const { loggedIn } = useContext(AuthContext);

  const { loading, error, data } = useQuery(FORM_QUERY, {
    variables: { formId },
  });

  const [addSubmission] = useMutation(ADD_SUBMISSION);
  const [content, setContent] = useState('');

  const [title, setFormTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

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
    }
  };

  let formContent;

  if (submissionStatus === 'success') {
    formContent = (
      <div>
        <h2 className="font-custom text-4xl text-primary">
          Your feedback was Submitted!
        </h2>
        <h3 className="font-custom text-4xl text-primary mt-5">
          Thanks for Sharing!
        </h3>
        <p className="font-custom text-2xl text-white mt-6">
          Feel free to revisit the link below whenever you have more feedback to
          share!
        </p>
        {data && data.form && (
          <p key={data.form.id} className="text-lg text-text font-custom mt-4">
            {data.form.url}
          </p>
        )}
      </div>
    );
  } else if (submissionStatus === 'error') {
    formContent = (
      <div>
        <h2 className="font-custom text-4xl text-primary">
          Error submitting feedback.
        </h2>
        <p className="font-custom text-2xl text-white mt-6">
          Please try again later.
        </p>
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
      {loggedIn() ? (
        <Link to="/forms">
          <button className="text-white bg-gradient-to-r from-primary via-accent-500 to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-custom font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 mr-6">
            Go Back
          </button>
        </Link>
      ) : null}
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
