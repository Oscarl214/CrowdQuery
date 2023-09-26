import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_ADMINISTRATOR } from '../utils/mutations';
import Nav from '../components/NavBar';
import { FaPeopleGroup } from 'react-icons/fa6';
import SUBGV from './Sign-Up-BG.svg';

function Signup(props) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [addAdministrator, { error, data }] = useMutation(ADD_ADMINISTRATOR);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('form state', formState);

    try {
      const { data } = await addAdministrator({
        variables: {
          ...formState,
        },
      });

      Auth.login(data.addAdministrator.token);
      window.location.href = '/';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${SUBGV})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Nav />
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="">
          <FaPeopleGroup className=" text-4xl md:text-8xl text-accent animate-pulse" />
        </div>
        <h1
          className="text-7xl text-secondary
         font-custom font-bold text-center mb-6 color-yellow "
        >
          SIGN UP
        </h1>
        <h3 className="text-2xl text-center mb-6 text-text font-custom">
          Crowd Query Protects your Information!
        </h3>

        <div className="container w-full max-w-md p-5 rounded-lg shrink-1 bg-secondary md:bg-secondary">
          <form onSubmit={handleFormSubmit} className="mt-4">
            <div className="flex flex-col mb-4">
              <input
                placeholder="Name"
                required
                name="name"
                type="name"
                id="name"
                value={formState.name}
                onChange={handleChange}
                className="border border-blue-300 p-2 mt-2 rounded-md "
              />
              <label
                className="text-white text-lg after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="UserName"
              >
                Name
              </label>
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="youremail@test.com"
                required
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label
                htmlFor="pwd"
                className="text-lg text-text font-custom font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Email
              </label>
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="******"
                required
                name="password"
                type="password"
                id="pwd"
                value={formState.password}
                onChange={handleChange}
                className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label
                htmlFor="pwd"
                className="text-lg text-text font-custom font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Password
              </label>
            </div>
            {error ? (
              <div>
                <p className="text-red-500">
                  User already exist, Please Sign In
                </p>
              </div>
            ) : null}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-accent text-text py-2 px-4 rounded hover:bg-primary hover:text-accent text-bold font-custom"
              >
                Sign Up
              </button>
              <div>
                <Link
                  to="/login"
                  className="bg-primary text-text py-2 px-4 rounded hover:bg-accent hover:text-text ml-4 font-custom"
                >
                  Have An Account? Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
