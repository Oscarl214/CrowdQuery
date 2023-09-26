import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import gsap from 'gsap';

const FormButton = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname && (
        <Link to="/CreateForm">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-primary via-accent-500 to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-custom font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 mr-6"
          >
            Create Form
          </button>
        </Link>
      )}
    </div>
  );
};

export default FormButton;
