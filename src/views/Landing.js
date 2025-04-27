import MainNavbar from 'components/Navbars/MainNavbar';
import React, { useState, Link } from 'react';
import { Calendar, Users, Clock, FileText, ChevronDown, ArrowRight } from 'react-feather';
import StudentCalendar from "../views/auth/StudentCalendar";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('tutors');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  return (
    
    <div className="min-h-screen bg-gray-50 ">
    

      
      
      {/* Header */}
      <header className="bg-lightBlue-800  shadow-sm">
      
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <MainNavbar/>
           {/* <h1 className="text-3xl font-bold text-white">Apprendre Avec Nous</h1>  */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Mon Profil</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 px-1 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-blueGray-100">Jean</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`}
              />
            </button>
            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</button>
                <button href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</button>
                <button href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t">Aide</button>
                <button href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Déconnexion</button>
              </div>
            )}
          </div>
        </div>
      </header>
       
      {/* Main Navigation */}
      <nav className="bg-lightBlue-200  shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {/* <button
              onClick={() => setActiveTab('tutors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tutors' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <Users size={18} /> 
                <span>Tuteurs</span>
              </div>
            </button> */}
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'calendar' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>Calendrier</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>Historique des leçons</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'resources' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <FileText size={18} />
                <span>Ressources</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
       
      {/* Main Content */}
      <main className="container mx-auto flex-grow flex flex-col min-h-screen px-4 py-10">
        {/* Enrollment Banner */}
        
        
        {/* Tab Content */}
        <div className="bg-lightBlue-200 rounded-lg shadow-md p-6">
          {activeTab === 'calendar' && 
          
              
              <StudentCalendar />
              
            
          }

          {activeTab === 'history' && (
            <div>
              <h2 className="text-xl font-bold text-center mb-4">Historique des leçons</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((lesson) => (
                  <div key={lesson} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Leçon avec le tuteur {lesson}</h3>
                        <p className="text-sm text-gray-600">Mai {10 + lesson}, 2023 - 60 minutes</p>
                      </div>
                      <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div>
              <h2 className="text-xl font-bold text-center mb-4">Ressources pédagogiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Guide de grammaire', 'Listes de vocabulaire', 'Exercices pratiques'].map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition duration-200">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <FileText className="text-blue-500" />
                    </div>
                    <h3 className="font-bold mb-2">{resource}</h3>
                    <p className="text-sm text-gray-600 mb-3">Matériels utiles pour compléter votre apprentissage</p>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer/>
    </div>
  );
};

export default StudentDashboard;