import React from 'react';
import Nav from '../components/NavBar';
import { Typography } from '@material-tailwind/react';

import HWSVG2 from './HWSVG2.svg';
import {
  PiNumberSquareOne,
  PiNumberSquareTwoLight,
  PiNumberSquareThreeLight,
  PiNumberSquareFourLight,
  PiNumberSquareFiveLight,
  PiNumberSquareSixLight,
} from 'react-icons/pi';

const Rules = () => {
  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-center font-custom bg-background">
      <Nav />
      <div
        className="min-h-screen bg-cover bg-no-repeat bg-center font-custom"
        style={{ backgroundImage: `url(${HWSVG2})` }}
      >
        <div className="flex items-center justify-center flex-wrap w-full p-4 text-center rounded-lg shadow mt-5 ">
          <h2 className="mb-2 text-5xl font-bold text-white mr-8">
            How does Crowd Query Work?
            <p className="mb-5  text-gray-300 text-2xl mt-4">
              Start collecting suggestions with just 3 easy steps!
            </p>
          </h2>

          <div className="flex-col justify-start items-start m-8">
            <ul>
              <li>
                <div>
                  <div>
                    <PiNumberSquareOne className="text-text text-4xl " />
                    <h2 className=" text-text text-4xl font-custom my-4 ">
                      First, Create your Form
                    </h2>
                    <p className=" text-gray-300 text-2xl my-4">
                      All you need is a proper title followed by details for
                      your form.
                    </p>
                    <img
                      className="h-96 w-full rounded-lg object-cover object-center"
                      src="./Step1.png"
                      alt="step one "
                    />
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <PiNumberSquareTwoLight className="text-text text-4xl mt-4" />
                    <h2 className=" text-text text-4xl font-custom  my-4">
                      Next, share the generated link with anyone you want to
                      collect feedback from.
                    </h2>
                    <p className=" text-gray-300 text-2xl  my-4">
                      Feel free to share the link by any means, email, chat,
                      networks, choice is yours.
                    </p>
                    <img
                      className="h-96 w-full rounded-lg object-cover object-center"
                      src="./Step2.png"
                      alt="step two "
                    />
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <PiNumberSquareThreeLight className="text-text text-4xl mt-4" />
                    <h2 className=" text-text text-4xl font-custom  my-4">
                      Lastly, sit back and wait for suggestions from others!
                    </h2>
                    <p className=" text-gray-300 text-2xl  my-4">
                      Your dashboard will populate with all your forms and their
                      latest submits from all your boxes.
                    </p>
                    <img
                      className="h-96 w-full rounded-lg object-cover object-center"
                      src="./Step3.png"
                      alt="step three "
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
