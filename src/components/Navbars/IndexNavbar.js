/*eslint-disable*/
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  const goToLogin = () => {
    history.push('/auth/login');
  };

  const toggleCoursesMenu = () => {
    setCoursesOpen(!coursesOpen);
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Plateforme E-Learning
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link
                  to="/home-training"
                  className="text-blueGray-700 hover:text-blueGray-500 px-3 py-2 flex items-center text-sm uppercase font-bold"
                >
                  Accueil
                </Link>
              </li>
              
              {/* Enhanced Courses Dropdown */}
              <li className="relative">
                <button
                  onClick={toggleCoursesMenu}
                  className="flex items-center text-blueGray-700 hover:text-blueGray-500 px-3 py-2 text-sm uppercase font-bold"
                >
                  Cours
                  <svg
                    className={`ml-2 h-4 w-4 transition-transform ${coursesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                {/* Dropdown Menu - Matching Profile Dropdown Style */}
                {coursesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/formations/developpement"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Developpement web
                      </Link>
                      <Link
                        to="/courses/design"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Design
                      </Link>
                      <Link
                        to="/courses/marketing"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Marketing Digital
                      </Link>
                      <Link
                        to="/courses/business"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Business
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              
              <li className="flex items-center">
                <Link
                  to="/contact"
                  className="text-blueGray-700 hover:text-blueGray-500 px-3 py-2 flex items-center text-sm uppercase font-bold"
                >
                  Contact
                </Link>
              </li>
            </ul>
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/ressources"
                  className="text-blueGray-700 hover:text-blueGray-500 px-3 py-2 flex items-center text-sm uppercase font-bold"
                >
                  Ressources
                </Link>
              </li>
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={goToLogin}
                >
                  <i className="fas fa-sign-in-alt mr-1"></i> Se connecter
                </button>
              </li>
              
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}