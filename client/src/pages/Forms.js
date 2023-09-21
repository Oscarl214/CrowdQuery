import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import ActiveForm from '../components/ActiveForm';

import { FaPeopleGroup } from 'react-icons/fa6';

import Nav from '../components/NavBar';
import DBSVG from './DB-BG.svg';
import FormButton from '../components/FormButton';

const Forms = () => {
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
        <FormButton />
      </div>
      <div>
        <ActiveForm />
      </div>
    </div>
  );
};

export default Forms;
