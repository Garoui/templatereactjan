import MainNavbar from 'components/Navbars/MainNavbar';
import React, { useState, Link } from 'react';
import { Calendar, Users, Clock, FileText, ChevronDown, ArrowRight } from 'react-feather';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('tutors');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar/>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ApprendreAvecNous</h1>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Mon Profil</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium">Jean</span>
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
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('tutors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tutors' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center space-x-2">
                <Users size={18} /> 
                <span>Tuteurs</span>
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
      <main className="container mx-auto px-4 py-8">
        {/* Enrollment Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 mb-8 text-black">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">INSCRIPTION</h2>
              <p className="text-lg font-medium">Obtenez votre première leçon pour seulement 1€</p>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <p>Rencontrez un tuteur natif</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <p>Définissez le rythme des leçons</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <p>Créez votre plan d'apprentissage</p>
              </div>
            </div> */}
            <button 
              onClick={() => setShowEnrollModal(true)}
              className="mt-4 md:mt-0 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-200 flex items-center"
            >
              Planifier maintenant <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'calendar' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Votre emploi du temps</h2>
              <div className="bg-gray-100 rounded-lg p-4 min-h-[400px]">
                <p className="text-center text-gray-500">Vue calendrier des leçons programmées</p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Historique des leçons</h2>
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
              <h2 className="text-xl font-bold mb-4">Ressources pédagogiques</h2>
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

      {/* Enroll Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Inscrivez-vous à votre première leçon</h2>
            <p className="mb-6">Commencez avec votre première leçon pour seulement 1€</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionnez une matière</label>
                <select className="w-full border rounded-md p-2">
                  <option>Anglais</option>
                  <option>Mathématiques</option>
                  <option>Sciences</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Langue préférée du tuteur</label>
                <select className="w-full border rounded-md p-2">
                  <option>Anglais</option>
                  <option>Espagnol</option>
                  <option>Français</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionnez un horaire disponible</label>
                <input type="datetime-local" className="w-full border rounded-md p-2" />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowEnrollModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirmer l'inscription (1€)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;