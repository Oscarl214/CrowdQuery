import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

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
    <div className="flex flex-col items-center justify-center h-screen background-darkBlue">
      <h1 className="text-7xl font-bold text-center mb-6 color-yellow">
        CROWD QUERY
      </h1>
      <h3 className="text-2xl text-center mb-6 text-white">
        GET INSTANT FEEDBACK!
      </h3>

      <div className="container w-full max-w-md background-medBlue p-5 rounded-lg shrink-1">
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
            <label htmlFor="pwd" className="text-lg text-white">
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
            <label htmlFor="pwd" className="text-lg text-white">
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
              className="background-yellow text-black py-2 px-4 rounded hover:background-darkBlue hover:text-white text-bold"
            >
              Sign In
            </button>
            <div>
              <Link
                to="/signup"
                className="background-yellow text-black py-2 px-4 rounded hover:background-darkBlue hover:text-white ml-4"
              >
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
