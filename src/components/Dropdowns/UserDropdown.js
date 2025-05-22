// components/Dropdowns/UserDropdown.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Settings, Book, LogOut } from "react-feather";
import Cookies from 'js-cookie';

const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Récupérer les données utilisateur depuis les cookies
  const userData = Cookies.get('user_data');
  const user = userData ? JSON.parse(userData) : null;

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return <div className="text-sm text-gray-500">Non connecté</div>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="mr-2">{user.prenom || "Utilisateur"}</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              Profil
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Link>
            <div className="border-t border-gray-100"></div>
            <Link
              to="/logout"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;