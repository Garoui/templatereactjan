import MainNavbar from 'components/Navbars/MainNavbar';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar, Clock, FileText, ChevronDown } from 'react-feather';
import StudentCalendar from "../views/auth/StudentCalendar";
import Footer from "components/Footers/Footer.js";
import StudentCourses from '../views/auth/StudentCourses';
 
import Cookies from 'js-cookie';

const StudentDashboard = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('calendar');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [user, setUser] = useState(null);

  const handleProfileClick = () => {
    setProfileDropdownOpen(false);
    history.push('/profile'); // Replace with your profile route
  };

  
    const handleLogout = () => {
      localStorage.removeItem('token');
      history.push('/login');
    };
  
    useEffect(() => {
      const userInfo = Cookies.get('user_info');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    }, []);
  return (
    
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div>
      {user ? (
        <div>
          <h1>Welcome, {user.nom}</h1> {/* Show user name or any other data */}
          <p>Your role: {user.role}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
      {/* Header Section */}
      <header className="bg-lightBlue-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <MainNavbar/>
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-lightBlue-700 transition-colors"
            >
              <span className="font-medium text-white">Jean</span>
              <ChevronDown 
                size={16} 
                className={`text-white transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`}
              />
            </button>
            
            {profileDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleProfileClick}>Profil</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t">Aide</button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={handleLogout}>Déconnexion</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">

          <button
  onClick={() => setActiveTab('courses')}
  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'courses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
>
  <div className="flex items-center space-x-2">
    <FileText size={18} />
    <span>Cours</span>
  </div>
</button>

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
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-lightBlue-200 rounded-lg shadow-md p-6">
        {activeTab === 'courses' && <StudentCourses />}

          {activeTab === 'calendar' && <StudentCalendar />}
          
          {activeTab === 'history' && (
            <div>
              <h2 className="text-xl font-bold text-center mb-4">Historique des leçons</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((lesson) => (
                  <div key={lesson} className="border-b  p-3 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Leçon avec le formateur {lesson}</h3>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;