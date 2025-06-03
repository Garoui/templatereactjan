import React from "react";
import { BookOpen, Calendar, ChevronRight, BarChart2, Settings } from "react-feather";

export default function FormateurDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header avec boutons d'action */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord Formateur</h1>
          <p className="text-gray-600">Bon retour, Professeur Dupont</p>
        </div>
      
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Carte Cours Actifs */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700">Cours actifs</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">5</h3>
            </div>
            <div className="p-3 bg-white rounded-full text-blue-600 shadow-sm">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
            <span>Voir détails</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Carte Étudiants */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700">Étudiants</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">127</h3>
            </div>
            <div className="p-3 bg-white rounded-full text-green-600 shadow-sm">
              <BarChart2 size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 flex items-center text-sm text-green-600 hover:text-green-800 cursor-pointer">
            <span>Voir liste</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Carte Tâches urgentes */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700">Tâches urgentes</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">3</h3>
            </div>
            <div className="p-3 bg-white rounded-full text-orange-600 shadow-sm">
              <Calendar size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200 flex items-center text-sm text-orange-600 hover:text-orange-800 cursor-pointer">
            <span>Voir calendrier</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des cours */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Mes Cours Récents</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Tout voir <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { title: "Algorithmes Avancés", progress: 75, students: 42, date: "2023-11-15", color: "bg-indigo-500" },
              { title: "Développement Web", progress: 60, students: 35, date: "2023-11-10", color: "bg-blue-500" },
              { title: "Base de Données", progress: 45, students: 28, date: "2023-11-05", color: "bg-teal-500" },
            ].map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.students} étudiants</p>
                  </div>
                  <span className="text-sm text-gray-500">{course.date}</span>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="w-full bg-gray-200 h-2 rounded-full mr-3">
                    <div 
                      className={`h-2 rounded-full ${course.color}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Détails →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne de droite */}
        <div className="space-y-6">
          {/* Mini calendrier */}
          

          {/* Tâches rapides */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tâches Rapides</h2>
            <div className="space-y-3">
              {/* <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="flex items-center text-gray-700">
                  <FileText size={16} className="mr-3 text-blue-500" />
                  <span>Créer un nouveau cours</span>
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </button> */}
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="flex items-center text-gray-700">
                  <Settings size={16} className="mr-3 text-blue-500" />
                  <span>Paramètres du compte</span>
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}