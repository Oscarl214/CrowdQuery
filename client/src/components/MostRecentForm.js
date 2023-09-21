import React from 'react';

import { useQuery } from '@apollo/client';
import { FORMS_QUERY } from '../utils/queries';

const RecentForm = () => {
  const { loading, data, error } = useQuery(FORMS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  const forms = data?.forms || [];

  console.log(forms);
  return (
    <div className="p-20 md:ml-28 ">
      <h1 className="text-text text-4xl font-bold mb-4">MOST RECENT FORMS</h1>
      {forms.map((form) => (
        <div
          key={form._id}
          className="bg-white rounded-lg shadow-2xl md:flex mb-4 border-primary border-8"
        >
          <img
            alt="none"
            src="./suggestionbox.png"
            className="md:w-25 rounded-t-lg md:rounded-l-lg md:rounded-t-none "
          />
          <div className="p-6">
            <h2 className="font-bold text-xl md:text-3xl mb-2 text-accent">
              {form.title}
            </h2>
            <p className="text-accent">{form.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentForm;
