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
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow-sm">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-gray-800 text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
            >
              EduPlatform
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars text-gray-600"></i>
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
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 flex items-center text-sm font-semibold"
                >
                  Accueil
                </Link>
              </li>
              
              <li className="relative">
                <button
                  onClick={toggleCoursesMenu}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold"
                >
                  Cours
                  <i className={`fas fa-angle-down ml-1 text-xs transition-transform ${coursesOpen ? 'transform rotate-180' : ''}`}></i>
                </button>
                
                {coursesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded shadow-lg bg-white border border-gray-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/formations/developpement"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Développement web
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
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 flex items-center text-sm font-semibold"
                >
                  Contact
                </Link>
              </li>
            </ul>
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/ressources"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 flex items-center text-sm font-semibold"
                >
                  Ressources
                </Link>
              </li>
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <button
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  type="button"
                  onClick={goToLogin}
                >
                   Se connecter
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}