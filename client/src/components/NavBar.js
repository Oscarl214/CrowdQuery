import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Link, useLocation } from 'react-router-dom';

import { GiCaptainHatProfile } from 'react-icons/gi';
import { FaFileWaveform } from 'react-icons/fa6';
import { RiDashboardLine } from 'react-icons/ri';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoIosArrowDropdown } from 'react-icons/io';

function Nav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div
          className={`sm:bg-transparent h-4/5 md:w-40  fixed ${
            isMobileMenuOpen ? 'hidden' : 'flex flex-col'
          }  md:bg-accent items-center justify-evenly`}
        >
          {/* ... your navigation items ... */}
          <ul className="space-y-20 ">
            {location.pathname !== '/' && (
              <li className="ml-4">
                <Link
                  to="/"
                  className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
                >
                  <RiDashboardLine className="text-4xl md:text-6xl" />
                </Link>
                <h2 className="font-custom text-lg text-text mr-1 font-bold">
                  DashBoard
                </h2>
              </li>
            )}

            {location.pathname !== '/Forms' && (
              <li className="ml-4">
                <Link
                  to="/Forms"
                  className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
                >
                  <FaFileWaveform className="text-4xl md:text-6xl" />
                </Link>
                <h2 className="font-custom text-lg text-text mr-1 font-bold">
                  {' '}
                  Forms
                </h2>
              </li>
            )}
            {location.pathname !== '/Profile' && (
              <li className="ml-4">
                <Link
                  to="/Profile"
                  className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
                >
                  <GiCaptainHatProfile className="text-4xl md:text-6xl" />
                </Link>
                <h2 className="font-custom text-lg text-text mr-1 font-bold">
                  Profile
                </h2>
              </li>
            )}
          </ul>
          <div className="mb-3">
            <a
              href="/"
              onClick={() => Auth.logout()}
              className="background-medBlue text-white py-2 px-2 rounded hover:background-primary hover:text-black text-bold"
            >
              <BiLogOutCircle className="text-4xl md:text-6xl my-5" />
            </a>
            <h2 className="font-custom text-lg text-text mr-1 font-bold">
              Logout
            </h2>
          </div>
        </div>
      );
    } else {
      return (
        <ul className="flex items-center">
          <li className="ml-3 font-custom text-3xl">
            <Link
              to="/signup"
              className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
            >
              Signup
            </Link>
          </li>
          <li className="ml-3  font-custom text-3xl">
            <Link
              to="/login"
              className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
            >
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <nav>
        <div className="block">
          <button onClick={handleMobileMenuToggle} className="text-white">
            <IoIosArrowDropdown className=" text-4xl md:text-8xl text-text animate-pulse  m-4" />
          </button>
        </div>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
