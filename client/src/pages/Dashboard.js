import React from 'react';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';
import Nav from '../components/NavBar';

import DBSVG from './DB-BG.svg';
import RecentForm from '../components/MostRecentForm';

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
        height: '100vh',
      }}
    >
      <Nav />
      <RecentForm />
    </div>
  );
};

export default DashBoard;
