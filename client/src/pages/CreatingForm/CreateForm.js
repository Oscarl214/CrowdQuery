import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADMINISTRATOR_QUERY, FORMS_QUERY } from '../../utils/queries';
import { ADD_FORM } from '../../utils/mutations';
import Nav from '../../components/NavBar';
import { FaPeopleGroup } from 'react-icons/fa6';
import DBSVG from '../DashBoard/DB-BG.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { gsap } from 'gsap/';

//My CreateForm Page that serves the purpose to populate when the user clicks on the createForm button
const CreateForm = () => {
  //Setting a state for both my title and description to be initially set to empty
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //My green sock animation that I use to animate my form from the bottom of the page (y)
  useEffect(() => {
    gsap.fromTo(
      '.anim',
      { y: 400, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.5, stagger: 0.15 }
    );
  }, []);

  //Here I use my Add Form Mutation while I also go on to update the cache of my main query that populates the
  //admins forms
  //uses the update method and takes in the addform mutation that happens
  //than reads the current cache "Admin_Query"
  //than rewrites it and this time we pass in the new form to the admins forms array
  //doing this updates my dashboard with the new form when the user navigates back to
  // wherever I use the admin query like in my Dashboard,Forms Page
  const [addForm, { error }] = useMutation(ADD_FORM, {
    update(cache, { data: { addForm } }) {
      try {
        const { administrator } = cache.readQuery({
          query: ADMINISTRATOR_QUERY,
        });
        cache.writeQuery({
          query: ADMINISTRATOR_QUERY,
          data: {
            administrator: {
              ...administrator,
              forms: [...administrator.forms, addForm],
            },
          },
        });
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

  //I create an empty state for my form URL
  const [formUrl, setFormUrl] = useState(null);

  //On my handleFormSubmit function I await my mutation where
  //I pass in the values of set title and desc that happen in my form jsk onChange
  //than with my new form data I set the state of my form url so I can display it
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    try {
      const response = await addForm({
        variables: { title, description },
      });

      const newForm = response.data.addForm;

      setFormUrl(newForm.url);
      console.log('addForm data:', response.data.addForm);
    } catch (error) {
      console.log('Error creating Form', error);
    }
  };

  //create a copy state to initially false so that the user can copy the url
  const [copied, setCopied] = useState(false);

  //function that changes when the user clicks on the copy icon
  //which changes the state to true which executes the ternary set to display "copied" if the state is set to true
  const handleCopyToClipboard = () => {
    setCopied(true);
  };

  //I conditionally render this component based on if my form url is posted
  //If my form is posted than let the admin know the form has been created
  //else
  //Display the create form that executes the addForm mutation
  let displayContent;

  if (formUrl) {
    displayContent = (
      <div>
        <Nav />
        <div class="flex flex-col justify-center items-center mx-auto max-w-screen-lg p-4 text-center font-custom bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-text dark:border-gray-700 overflow-y-auto">
          <h5 class="mb-2 text-3xl font-bold text-accent ">
            Your Form has been Created!
          </h5>
          <p class="mb-5 text-base text-black sm:text-lg ">
            The link to your form is below. You can send it to others and start
            collecting feedback!
          </p>
          <div className="text-center mt-4 font-custom flex">
            <div className="flex items-center">
              <p className="text-lg">{formUrl}</p>

              <CopyToClipboard text={formUrl} onCopy={handleCopyToClipboard}>
                <div className="ml-2 cursor-pointer">
                  <FiCopy className="text-2xl text-accent" />
                </div>
              </CopyToClipboard>
              {copied ? (
                <span className="text-green text-bold text- lg">Copied</span>
              ) : null}
            </div>
          </div>
          <div>
            <p className="font-custom text-2xl mt-5">
              Preview the Form to see what Users will See!
            </p>
            <Link to={formUrl}>
              <button className="text-white bg-gradient-to-r from-primary via-accent-500 to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-custom font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 mr-6 mt-5">
                Preview
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    displayContent = (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div class=" max-w-5xl w-full p-6 bg-white rounded-lg shadow-lg anim">
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
                  required
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
                  required
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
        <Nav />
        {displayContent} {}
      </div>
    </div>
  );
};

export default CreateForm;
