import React from 'react';

import { useQuery } from '@apollo/client';
import { FORMS_QUERY } from '../utils/queries';

import { LuArrowDownRightFromCircle } from 'react-icons/lu';
import FormButton from './FormButton';
const RecentForm = () => {
  const { loading, data, error, refetch } = useQuery(FORMS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  console.log('Data from forms query:', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  const forms = data?.forms || [];
  console.log(data);

  console.log(forms);

  let displayContent;

  if (forms.length === 0) {
    displayContent = (
      <div>
        <p className="text-text font-custom text-4xl">
          Looks like you have no Forms Yet
        </p>
        <div className="mt-7">
          <FormButton />
        </div>
      </div>
    );
  } else {
    displayContent = forms.map((form) => (
      <div
        key={form._id}
        className="bg-white rounded-lg shadow-2xl md:flex mb-4 border-primary border-6"
      >
        <LuArrowDownRightFromCircle className="text-7xl " />
        <div className="p-6">
          <h2 className="font-bold text-lxl md:text-3xl mb-2 text-accent">
            {form.title}
          </h2>
          <p className="text-accent">{form.createdAt}</p>
          <div>
            <h2 className="font-custom text-xl">Latest Submissions:</h2>
            {form.submissions.slice(0, 3).map((submission) => (
              <div className=" bg-primary  rounded-lg shadow-2xl md:flex mb-4 border border-accent border-6  p-4">
                <div key={submission._id} className="mb-4">
                  <p className="font-custom text-2xl"> {submission.content}</p>
                  <p> {submission.createdAt}</p>
                  {/* Add more information from the submission as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div className="p-20 md:ml-28 ">
      <h2 className="text-text text-4xl font-bold mb-4">
        RECENT <a className="text-primary">ACTIVITY</a>
      </h2>
      {displayContent}
    </div>
  );
};

export default RecentForm;
