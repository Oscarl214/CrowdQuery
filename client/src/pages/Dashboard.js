import React from 'react';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';
import Nav from '../components/NavBar';

import DBSVG from './DB-BG.svg';
import RecentForm from '../components/MostRecentForm';

import { FaPeopleGroup } from 'react-icons/fa6';
const DashBoard = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${DBSVG})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '150vh',
      }}
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
