// src/components/Navbars/MainNavbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">LearnWithUs</h1>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {user?.prenom?.charAt(0) || "U"}
            </div>
            <span className="hidden md:inline">Mon Profil</span>
          </Link>
        </div>
      </div>
    </header>
  );
}