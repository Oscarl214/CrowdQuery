import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_FORM } from '../utils/mutations';
import Nav from '../components/NavBar';
import { FaPeopleGroup } from 'react-icons/fa6';
import DBSVG from './DB-BG.svg';
import { Navbar } from 'flowbite-react';
const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createForm, { loading, data, error }] = useMutation(ADD_FORM);
  const [formUrl, setFormUrl] = useState(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createForm({
        variables: { title, description },
      });
      console.log('Response:', response);

      const newForm = response.data.addForm;

      setFormUrl(newForm.url);
    } catch (error) {
      console.log('Error creating Form', error);
    }
  };

  let displayContent;

  if (formUrl) {
    // If formUrl is available, display the URL
    displayContent = (
      <div>
        <Nav />
        <div className="text-center mt-4">
          Form URL:
          <a href={formUrl} className="text-blue-500">
            {formUrl}
          </a>
        </div>
      </div>
    );
  } else {
    displayContent = (
      <div>
        <div className="flex justify-between items-center">
          <Nav />
          <FaPeopleGroup className=" text-4xl md:text-8xl text-text my-3 mr-4" />
        </div>
        <div class="min-h-screen flex items-center justify-center">
          <div class=" max-w-5xl w-full p-6 bg-white rounded-lg shadow-lg">
            <div class="flex justify-center mb-8 font-custom">
              <FaPeopleGroup className=" text-4xl md:text-8xl  my-3 mr-4 text-primary" />
            </div>
            <h1 class="text-2xl font-semibold font-custom text-center text-accent mt-8 mb-6">
              Create A New Form
            </h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <div class="mb-4 font-custom">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="font-custom py-3">
                  Please provide a clear and concise Title that is to the point.
                  For Example: <a className="italic">Company New Hire Policy</a>
                  or <a className="italic"> Holiday Bonus</a>
                </p>
              </div>
              <div class="mb-4 font-custom">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p>
                  Provide any additional details on what type of feedback you
                  are looking for.{' '}
                </p>
              </div>
              <button
                type="submit"
                class="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
              >
                Create Form
              </button>
            </form>

            <p class="text-xs text-gray-600 text-center mt-8">
              &copy; 2023 Crowd Query
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${DBSVG})` }}
      >
        {displayContent} {}
      </div>
    </div>
  );
};

export default CreateForm;
