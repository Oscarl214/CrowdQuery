import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import BGSVG from './BG_Login.svg';

import { FaPeopleGroup } from 'react-icons/fa6';
import Nav from '../components/NavBar';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${BGSVG})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Nav />
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="">
          <FaPeopleGroup className=" text-4xl md:text-8xl text-primary animate-pulse" />
        </div>
        <h1 className="text-7xl text-text font-custom font-bold text-center mb-6 color-yellow ">
          Sign In
        </h1>
        <h3 className="text-2xl text-center mb-6 text-text font-custom">
          Sign in to your Free Crowd Query account.
        </h3>

        <div className="container w-full max-w-md p-5 rounded-lg shrink-1 bg-secondary md:bg-secondary">
          <form onSubmit={handleFormSubmit} className="mt-4">
            <div className="flex flex-col mb-4">
              <input
                placeholder="youremail@test.com"
                required
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label
                htmlFor="pwd"
                className="text-lg text-text font-custom font-bold"
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
                onChange={handleChange}
                className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label
                htmlFor="pwd"
                className="text-lg text-text font-custom font-bold"
              >
                Password
              </label>
            </div>
            {error ? (
              <div>
                <p className="text-red-500">
                  The provided credentials are incorrect
                </p>
              </div>
            ) : null}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-accent text-text py-2 px-4 rounded hover:bg-primary hover:text-accent text-bold font-custom"
              >
                Sign In
              </button>
              <div>
                <Link
                  to="/signup"
                  className="bg-primary text-text py-2 px-4 rounded hover:bg-accent hover:text-text ml-4 font-custom"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
