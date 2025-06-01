// src/components/Navbars/MainNavbar.js
// import React from "react";
// import { Link } from "react-router-dom";
// export default function MainNavbar() {
 

  
//   return (
    
//     <header className="bg-blueGray-900 shadow-sm">
//       <div className="container mx-auto px- py-2 flex justify-between items-center">
        
        
//         <div className="flex items-center space-x-4">
//         <Link
//                       className="text-white  font-bold  whitespace-nowrap uppercase"
//                       to="/"
//                     >
//                      Accueil
//                     </Link>
//         </div>
//       </div>
//     </header>
//   );
// }*
import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function MainNavbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
           <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Tableau de bord
          </a> 
        
        
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
