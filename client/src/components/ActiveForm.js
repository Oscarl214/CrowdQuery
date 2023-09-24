import React from 'react';

import { useQuery } from '@apollo/client';
import { FORMS_QUERY } from '../utils/queries';

import { BsBoxArrowInDown } from 'react-icons/bs';

import { BsCalendarDate } from 'react-icons/bs';

import { MdHttps } from 'react-icons/md';
import { Link } from 'react-router-dom';
const ActiveForm = () => {
  const { loading, data, error } = useQuery(FORMS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  const activeForms = data?.forms || [];

  console.log(activeForms);
  return (
    <div className="p-20 md:ml-28 ">
      <h1 className="text-text text-4xl font-bold mb-4 font-custom">
        ACTIVE FORMS
      </h1>

      {activeForms.map((form) => (
        <Link to={`SpecificForm/${form._id}`} key={form._id}>
          <div
            key={form._id}
            className="bg-white rounded-lg shadow-2xl md:flex mb-4 border-primary border-4"
          >
            <div className="p-6 text-2xl max-h-96 overflow-y-auto">
              <h2 className="font-bold font-custom text-xl md:text-3xl mb-2 text-accent">
                {form.title}
              </h2>
              <p className="flex items-center flex-wrap">
                <BsCalendarDate className="mr-2 text-custom" />
                {form.createdAt}
              </p>
              <br></br>
              <p className="flex items-center">
                <BsBoxArrowInDown className="mr-2 text-custom" />
                {form.submissions.length} Submissions
              </p>
              <p className="flex items-center">
                <MdHttps className="mr-2 text-custom" />
                {form.url}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ActiveForm;
