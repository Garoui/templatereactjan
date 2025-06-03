

import React from "react";
import { BookOpen, Calendar, FileText, Award, Clock, BarChart2,ChevronRight } from "react-feather";

// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";

export default function Dashboard() {
  return (
    <>
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mon Tableau de Bord</h1>
        <p className="text-purple-600">Bienvenue de retour, Jean Dupont</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {/* Carte Progression */}
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
              <BarChart2 size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Progression globale</p>
              <h3 className="text-2xl font-bold">68%</h3>
            </div>
          </div>
        </div>

        {/* Carte Cours */}
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600 mr-4">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cours suivis</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </div>

        {/* Carte Objectifs */}
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
              <Award size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Objectifs</p>
              <h3 className="text-2xl font-bold">3/5</h3>
            </div>
          </div>
        </div>

        {/* Carte Temps */}
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Temps passé</p>
              <h3 className="text-2xl font-bold">12h</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cours en cours */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Mes Cours en Cours</h2>
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
              Voir tout <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { 
                title: "Développement Web Avancé", 
                progress: 75, 
                instructor: "Prof. Martin",
                nextLesson: "Demain à 10h",
                color: "bg-gradient-to-r from-purple-500 to-blue-500"
              },
              { 
                title: "Algorithmes", 
                progress: 45, 
                instructor: "Prof. Dubois",
                nextLesson: "Mercredi à 14h",
                color: "bg-gradient-to-r from-green-500 to-teal-500"
              },
              { 
                title: "Base de Données", 
                progress: 30, 
                instructor: "Prof. Lambert",
                nextLesson: "Vendredi à 9h",
                color: "bg-gradient-to-r from-orange-500 to-yellow-500"
              }
            ].map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className={`w-2 h-16 rounded-full ${course.color} mr-4`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Avec {course.instructor}</p>
                    
                    <div className="mt-3 flex items-center">
                      <div className="w-full bg-gray-200 h-2 rounded-full mr-3">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${course.progress}%`,
                            background: course.color.includes('purple') ? 
                              'linear-gradient(to right, #8b5cf6, #3b82f6)' :
                              course.color.includes('green') ?
                              'linear-gradient(to right, #10b981, #0d9488)' :
                              'linear-gradient(to right, #f97316, #f59e0b)'
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {course.nextLesson}
                      </span>
                      <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        Continuer →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne de droite */}
        <div className="space-y-6">
          {/* Prochaines sessions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Prochaines Sessions</h2>
            
            <div className="space-y-3">
              {[
                { course: "Développement Web", time: "Demain 10h-12h", type: "Cours" },
                { course: "Algorithmes", time: "Mercredi 14h-16h", type: "TD" },
                { course: "Base de Données", time: "Vendredi 9h-11h", type: "TP" }
              ].map((session, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                    <Calendar size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{session.course}</h4>
                    <p className="text-sm text-gray-600">{session.time}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {session.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full text-center text-purple-600 hover:text-purple-800 text-sm font-medium">
              Voir calendrier complet →
            </button>
          </div>

          {/* Ressources récentes */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ressources Récentes</h2>
            
            <div className="space-y-3">
              {[
                { title: "Guide React", type: "PDF", date: "Ajouté hier" },
                { title: "Exercices Algorithmes", type: "Document", date: "Ajouté il y a 2 jours" },
                { title: "Vidéos Bases de Données", type: "Vidéo", date: "Ajouté il y a 1 semaine" }
              ].map((resource, index) => (
                <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 bg-purple-100 rounded-full mr-3 text-purple-600">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{resource.title}</h4>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{resource.type}</span>
                      <span>{resource.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full text-center text-purple-600 hover:text-purple-800 text-sm font-medium">
              Toutes les ressources →
            </button>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
}




// /*eslint-disable*/
// import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { Calendar, Clock, FileText, ChevronDown } from 'react-feather';
// import Calendar from "./Calendar";
// import Courses from "./Courses";
// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";
// import Cookies from 'js-cookie';

// const  Dashboard = () => {
//   const [collapseShow, setCollapseShow] = React.useState("hidden");
//   const [activeTab, setActiveTab] = useState('courses');
//   const [user, setUser] = useState(null);
//   const history = useHistory();

//   useEffect(() => {
//     const userInfo = Cookies.get('user_data');
//     if (userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//   }, []);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'courses':
//         return <Courses />;
//       case 'calendar':
//         return <Calendar />;
     
//       case 'resources':
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold">Ressources pédagogiques</h2>
//             <div className="flex flex-wrap">
//               {['Guide de grammaire', 'Listes de vocabulaire', 'Exercices pratiques'].map((resource, index) => (
//                 <div key={index} className="w-full md:w-4/12 px-4">
//                   <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
//                     <div className="p-4 flex-auto">
//                       <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
//                         <FileText className="text-blue-500" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-center mb-2">{resource}</h3>
//                       <p className="text-sm text-blueGray-500 text-center mb-4">
//                         Matériels utiles pour compléter votre apprentissage
//                       </p>
//                       <div className="text-center">
//                         <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
//                           Télécharger
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
//         <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
//           {/* Toggler */}
//           <button
//             className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//             type="button"
//             onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
//           >
//             <i className="fas fa-bars"></i>
//           </button>
//           {/* Brand */}
//           <Link
//             className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
//             to="/student/dashboard"
//           >
//             Tableau de Bord Apprenant
//           </Link>
//           {/* User */}
//           <ul className="md:hidden items-center flex flex-wrap list-none">
//             <li className="inline-block relative">
//               <NotificationDropdown />
              
//             </li>
//             <li className="inline-block relative">
//               <UserDropdown />
//             </li>
//           </ul>
//           {/* Collapse */}
//           <div
//             className={
//               "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
//               collapseShow
//             }
//           >
//             {/* Collapse header */}
//             <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
//               <div className="flex flex-wrap">
//                 <div className="w-6/12">
//                   <Link
//                     className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
//                     to="/student/dashboard"
//                   >
//                     Apprenant
//                   </Link>
//                 </div>
//                 <div className="w-6/12 flex justify-end">
//                   <button
//                     type="button"
//                     className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//                     onClick={() => setCollapseShow("hidden")}
//                   >
//                     <i className="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <ul className="md:flex-col md:min-w-full flex flex-col list-none">
//               <li className="items-center">
//                 <button
//                   onClick={() => setActiveTab('courses')}
//                   className={
//                     "text-xs uppercase py-3 font-bold block w-full text-left " +
//                     (activeTab === 'courses' 
//                       ? "text-lightBlue-500 hover:text-lightBlue-600" 
//                       : "text-blueGray-700 hover:text-blueGray-500")
//                   }
//                 >
//                   <i
//                     className={
//                       "fas fa-book mr-2 text-sm " +
//                       (activeTab === 'courses' 
//                         ? "opacity-75" 
//                         : "text-blueGray-300")
//                     }
//                   ></i>{" "}
//                   Mes Cours
//                 </button>
//               </li>

//               <li className="items-center">
//                 <button
//                   onClick={() => setActiveTab('calendar')}
//                   className={
//                     "text-xs uppercase py-3 font-bold block w-full text-left " +
//                     (activeTab === 'calendar' 
//                       ? "text-lightBlue-500 hover:text-lightBlue-600" 
//                       : "text-blueGray-700 hover:text-blueGray-500")
//                   }
//                 >
//                   <i
//                     className={
//                       "fas fa-calendar mr-2 text-sm " +
//                       (activeTab === 'calendar' 
//                         ? "opacity-75" 
//                         : "text-blueGray-300")
//                     }
//                   ></i>{" "}
//                   Calendrier
//                 </button>
//               </li>

             

//               <li className="items-center">
//                 <button
//                   onClick={() => setActiveTab('resources')}
//                   className={
//                     "text-xs uppercase py-3 font-bold block w-full text-left " +
//                     (activeTab === 'resources' 
//                       ? "text-lightBlue-500 hover:text-lightBlue-600" 
//                       : "text-blueGray-700 hover:text-blueGray-500")
//                   }
//                 >
//                   <i
//                     className={
//                       "fas fa-file-alt mr-2 text-sm " +
//                       (activeTab === 'resources' 
//                         ? "opacity-75" 
//                         : "text-blueGray-300")
//                     }
//                   ></i>{" "}
//                   Ressources
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="relative md:ml-64 bg-blueGray-100">
//         {/* Top Navigation */}
//         <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
//           <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
//             <h2 className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
//               {activeTab === 'courses' && 'Mes Cours'}
//               {activeTab === 'calendar' && 'Calendrier des Sessions'}
//               {activeTab === 'history' && 'Historique des Leçons'}
//               {activeTab === 'resources' && 'Ressources Pédagogiques'}
//             </h2>
            
//             <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
//               <NotificationDropdown />
//               <UserDropdown />
//             </ul>
//           </div>
//         </nav>

//         {/* Content */}
//         <div className="relative bg-blueGray-100 md:pt-32 pb-32 pt-12">
//           <div className="px-4 md:px-10 mx-auto w-full">
//             <div className="flex flex-wrap">
//               {/* Main Content Area */}
//               <div className="w-full px-4">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//                   <div className="rounded-t mb-0 px-4 py-3 border-0">
//                     <div className="flex flex-wrap items-center">
//                       <div className="relative w-full px-4 max-w-full flex-grow flex-1">
//                         <h3 className="font-semibold text-base text-blueGray-700">
//                           {activeTab === 'courses' && 'Liste de mes cours'}
//                           {activeTab === 'calendar' && 'Calendrier des sessions'}
//                           {activeTab === 'history' && 'Historique des leçons complétées'}
//                           {activeTab === 'resources' && 'Ressources disponibles'}
//                         </h3>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="block w-full overflow-x-auto p-6">
//                     {renderTabContent()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;