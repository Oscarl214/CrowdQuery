import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_ADMINISTRATOR } from '../../utils/mutations';
import Nav from '../../components/NavBar';
import { FaPeopleGroup } from 'react-icons/fa6';
import SUBGV from './Sign-Up-BG.svg';

import SUBGV2 from './SignUp-2.svg';
import Footer from '../Footer';
import gsap from 'gsap';

function Signup(props) {
  useEffect(() => {
    gsap.fromTo(
      '.image',
      { y: 400, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.5, stagger: 0.15, delay: 1 }
    );
  }, []);

  //Setting a formState for my Sign Up Form, initial state is the fields
  //being blanked
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  //Using my add admin mutation through the apollo client function "USeMutation"
  const [addAdministrator, { error, data }] = useMutation(ADD_ADMINISTRATOR);

  //my handle Change event function that takes in the fields inputted values
  //and handles the fields being blank to setting the FormState with the new values
  const handleChange = (event) => {
    const { name, email, password, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      [email]: email,
      [password]: password,
    });
  };

  //My handle Submit form that happens async that awaits my addAmin mutation that holds my
  //new FormState with the inputted values
  //Which the uses the Auth login function that takes the admin info into the db which then uses to log the user in
  //and then refreshes into the dashboard page with a newly logged in token stored in local storage
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
      <div className="flex flex-column justify-evenly items-center font-custom flex-wrap m-5">
        <FaPeopleGroup className=" text-9xl text-white  " />
        <div className="text-center mt-4">
          <h1 className="text-7xl text-black font-bold">Free, easy,</h1>
          <h1 className="text-7xl text-white font-bold">
            {' '}
            and <a className="text-black">anonymous</a> Feedback!
          </h1>
          <p className="text-gray-300 text-3xl mt-6 ">
            Collect real and honest feedback.
          </p>
          <p className="text-gray-300 text-3xl mt-2">
            Instantly start collecting information from employees, friends,
            co-workers,
          </p>
          <p className="text-gray-300 text-3xl">
            or anyone else using an anonymous crowd query form.
          </p>
          <div>
            <h2 className="text-6xl text-black font-bold mt-8">
              How Does it Work?
            </h2>
            <Link to="/Rules">
              <button className="text-white bg-gradient-to-r from-primary via-accent-500 to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-custom font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 mr-6 mt-8">
                How It Works
              </button>
            </Link>
          </div>
        </div>
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

          <div className="container w-full h-2/4 p-5 rounded-lg shrink-1 bg-secondary md:bg-secondary">
            <form onSubmit={handleFormSubmit} className="mt-4">
              <div className="flex flex-col mb-4 justify-center">
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
      <div
        className=""
        style={{
          backgroundImage: `url(${SUBGV2})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-5xl text-gray-300 font-semibold m-4">
            Check the latest submissions via your DashBoard
          </h2>
          <img src="./Dashboard.png" className="image"></img>
        </div>
      </div>
    </div>
  );
}

export default Signup;
