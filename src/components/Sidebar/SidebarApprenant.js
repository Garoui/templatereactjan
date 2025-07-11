/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Calendar, Clock, FileText, ChevronDown } from 'react-feather';
import CalendarComponent from "../../views/apprenant/Calendar";
import Courses from "../../views/apprenant/Courses";
import ApprenantDashboard from "../../views/apprenant/Dashboard"; // Renamed import
// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";
import Cookies from 'js-cookie';

const SidebarApprenant = () => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [activeTab, setActiveTab] = useState('dashboard'); // Added dashboard as default
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const userInfo = Cookies.get('user_data');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ApprenantDashboard />; // Using renamed component
      case 'courses':
        return <Courses />;
      case 'calendar':
        return <CalendarComponent />;
      case 'resources':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Ressources pédagogiques</h2>
            <div className="flex flex-wrap">
              {['Guide de grammaire', 'Listes de vocabulaire', 'Exercices pratiques'].map((resource, index) => (
                <div key={index} className="w-full md:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                    <div className="p-4 flex-auto">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <FileText className="text-blue-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">{resource}</h3>
                      <p className="text-sm text-blueGray-500 text-center mb-4">
                        Matériels utiles pour compléter votre apprentissage
                      </p>
                      <div className="text-center">
                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                          Télécharger
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <ApprenantDashboard />; // Default to dashboard
    }
  };

  return (
    <>
      {/* Sidebar */}
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/apprenant/dashboard"
          >
            Tableau de Bord Apprenant
          </Link>
          
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/apprenant/dashboard"
                  >
                    Apprenant
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/* <li className="items-center">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={
                    "text-xs uppercase py-3 font-bold block w-full text-left " +
                    (activeTab === 'dashboard' 
                      ? "text-lightBlue-500 hover:text-lightBlue-600" 
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-tachometer-alt mr-2 text-sm " +
                      (activeTab === 'dashboard' 
                        ? "opacity-75" 
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Tableau de bord
                </button>
              </li> */}
              <li className="items-center">
                <button
                  onClick={() => setActiveTab('courses')}
                  className={
                    "text-xs uppercase py-3 font-bold block w-full text-left " +
                    (activeTab === 'courses' 
                      ? "text-lightBlue-500 hover:text-lightBlue-600" 
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (activeTab === 'courses' 
                        ? "opacity-75" 
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Mes Cours
                </button>
              </li>
              <li className="items-center">
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={
                    "text-xs uppercase py-3 font-bold block w-full text-left " +
                    (activeTab === 'calendar' 
                      ? "text-lightBlue-500 hover:text-lightBlue-600" 
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-calendar mr-2 text-sm " +
                      (activeTab === 'calendar' 
                        ? "opacity-75" 
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Calendrier
                </button>
              </li>
              <li className="items-center">
                <button
                  onClick={() => setActiveTab('resources')}
                  className={
                    "text-xs uppercase py-3 font-bold block w-full text-left " +
                    (activeTab === 'resources' 
                      ? "text-lightBlue-500 hover:text-lightBlue-600" 
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-file-alt mr-2 text-sm " +
                      (activeTab === 'resources' 
                        ? "opacity-75" 
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Ressources
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative md:ml-60 bg-blueGray-100">
        {/* Top Navigation */}
        <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <h2 className="text-black text-sm uppercase hidden lg:inline-block font-semibold">
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'courses' && 'Mes Cours'}
              {activeTab === 'calendar' && 'Calendrier des Sessions'}
              {activeTab === 'resources' && 'Ressources Pédagogiques'}
            </h2>
          </div>
        </nav>
 
        {/* Content */}
        
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-5 py-5 border-0">
                    
                  </div>
                  <div className="block w-full overflow-x-auto p-6">
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default SidebarApprenant;