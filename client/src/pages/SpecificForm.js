import React from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FORM_QUERY } from '../utils/queries';
import Nav from '../components/NavBar';

import DBSVG from './DB-BG.svg';
import { BsBoxArrowInDown } from 'react-icons/bs';
const SpecificForm = () => {
  const { formId } = useParams();

  const { loading, data, error } = useQuery(FORM_QUERY, {
    variables: { formId },
  });

  // Check if loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check for errors
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if data is available
  if (!data || !data.form) {
    return <div>Data not found</div>;
  }

  const { title, createdAt, url, submissions } = data.form;

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${DBSVG})` }}
    >
      <div>
        <Nav />
      </div>
      <div className="p-20 md:ml-28">
        <div className="bg-white rounded-lg shadow-2xl md:flex mb-4 border-primary border-6">
          <div className="p-6 flex-grow">
            <h2 className="font-bold text-lxl md:text-3xl mb-2 text-accent">
              {title}
            </h2>
            <p className="text-accent">{createdAt}</p>
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className=" bg-primary rounded-lg shadow-2xl md:flex mb-4 border border-accent border-6  p-4"
              >
                <div className="mb-4">
                  <p className="font-custom text-2xl">{submission.content}</p>
                  <p>{submission.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 justify-center items-center">
            <Link to={url}>
              <button className="text-white bg-gradient-to-r from-primary via-accent-500 to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-custom font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 mr-6">
                Preview
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificForm;
