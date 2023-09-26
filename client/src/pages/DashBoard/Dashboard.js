import React, { useContext, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import Nav from '../../components/NavBar';

import DBSVG from './DB-BG.svg';
import RecentForm from '../../components/MostRecentForm';

import { FaPeopleGroup } from 'react-icons/fa6';

//My Dashboard Holder that contains my Nav and my Recent Form Component
const DashBoard = () => {
  //My Dashboard checks if user is not logged in than navigate to the login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${DBSVG})` }}
    >
      <div className="flex justify-between items-center">
        <Nav />
        <FaPeopleGroup className=" text-4xl md:text-8xl text-text my-3 mr-4" />
      </div>
      <RecentForm />
    </div>
  );
};

export default DashBoard;
