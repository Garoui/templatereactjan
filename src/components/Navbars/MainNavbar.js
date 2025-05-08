// src/components/Navbars/MainNavbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    
    <header className="bg-blueGray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        
        <div className="flex items-center space-x-4">
        <Link
                      className="text-white  font-bold  whitespace-nowrap uppercase"
                      to="/"
                    >
                     Accueil
                    </Link>
        </div>
      </div>
    </header>
  );
}