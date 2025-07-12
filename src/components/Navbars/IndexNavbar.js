/*eslint-disable*/
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCoursesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToLogin = () => {
    history.push('/auth/login');
  };

  const toggleCoursesMenu = () => {
    setCoursesOpen(!coursesOpen);
  };

  const courseCategories = [
    {
      title: "Développement",
      path: "/courses/development",
      subcategories: [
        { name: "Web Frontend", path: "/courses/development/frontend" },
        { name: "Web Backend", path: "/courses/development/backend" },
        { name: "Mobile Apps", path: "/courses/development/mobile" },
        { name: "Data Science", path: "/courses/development/data-science" },
      ]
    },
    {
      title: "Design",
      path: "/courses/design",
      subcategories: [
        { name: "UI/UX Design", path: "/courses/design/ui-ux" },
        { name: "Graphic Design", path: "/courses/design/graphic" },
        { name: "3D Modeling", path: "/courses/design/3d" },
      ]
    },
    {
      title: "Business",
      path: "/courses/business",
      subcategories: [
        { name: "Entrepreneurship", path: "/courses/business/entrepreneurship" },
        { name: "Digital Marketing", path: "/courses/business/marketing" },
        { name: "Finance", path: "/courses/business/finance" },
      ]
    },
    {
      title: "IT & Software",
      path: "/courses/it",
      subcategories: [
        { name: "Cyber Security", path: "/courses/it/security" },
        { name: "Cloud Computing", path: "/courses/it/cloud" },
        { name: "DevOps", path: "/courses/it/devops" },
      ]
    }
  ];

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow-sm border-b border-gray-100">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-gray-800 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap flex items-center"
            >
              <i className="fas fa-graduation-cap text-blue-500 mr-2"></i>
              EduPlatform
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className={`fas ${navbarOpen ? 'fa-times' : 'fa-bars'} text-gray-600`}></i>
            </button>
          </div>
          
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded-lg shadow-md mt-2" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link
                  to="/home"
                  className="text-gray-700 hover:text-blue-600 px-3 py-3 flex items-center text-sm font-semibold transition-colors duration-200"
                >
                  <i className="fas fa-home mr-2"></i> Accueil
                </Link>
              </li>
              
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleCoursesMenu}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-3 text-sm font-semibold transition-colors duration-200"
                >
                  <i className="fas fa-book mr-2"></i> Cours
                  <i className={`fas fa-angle-down ml-1 text-xs transition-transform ${coursesOpen ? 'transform rotate-180' : ''}`}></i>
                </button>
                
                {coursesOpen && (
                  <div className="absolute left-0 mt-1 w-64 rounded-lg shadow-lg bg-white border border-gray-200 z-50 overflow-hidden">
                    <div className="py-2">
                      {courseCategories.map((category, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0">
                          <Link
                            to={category.path}
                            className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {category.title}
                          </Link>
                          <div className="pl-4 pb-2">
                            {category.subcategories.map((sub, subIndex) => (
                              <Link
                                key={subIndex}
                                to={sub.path}
                                className="block px-3 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-500 rounded"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
                      <Link
                        to="/all-courses"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Voir tous les cours <i className="fas fa-arrow-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              
              <li className="flex items-center">
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 px-3 py-3 flex items-center text-sm font-semibold transition-colors duration-200"
                >
                  <i className="fas fa-envelope mr-2"></i> Contact
                </Link>
              </li>
            </ul>
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/resources"
                  className="text-gray-700 hover:text-blue-600 px-3 py-3 flex items-center text-sm font-semibold transition-colors duration-200"
                >
                  <i className="fas fa-file-alt mr-2"></i> Ressources
                </Link>
              </li>
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center mt-2 lg:mt-0">
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-black font-semibold px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 uppercase text-sm shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 ease-linear transition-all duration-150 flex items-center"
                  type="button"
                  onClick={goToLogin}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i> Se connecter
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}