// // views/Landing.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Landing = () => {
//   return (
//     <div className="relative bg-blueGray-200 overflow-hidden min-h-screen">
//       {/* Barre de navigation */}
//       <nav className="relative bg-lightBlue-600 shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
//             <div className="flex justify-start lg:w-0 lg:flex-1">
//               <Link to="/">
//                 <span className="sr-only">Logo</span>
//                 <img
//                   className="h-8 w-auto sm:h-10"
//                   src="/learning1.png"
//                   alt="Logo"
//                 />
//               </Link>
              
//             </div>
// </div>
          
//         </div>
//       </nav>

//       {/* Contenu principal */}
//       <main className="mt-10 mx-auto max-w-7xl  px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
//         <div className="text-center">
//           <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//             <span className="block">Bienvenue sur notre</span>
//             <span className="block text-indigo-600">Plateforme d'Apprentissage</span>
//           </h1>
//           <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//             Découvrez une nouvelle façon d'apprendre avec nos cours interactifs et nos formateurs experts.
//           </p>
//           <div className="mt-5 max-w-md mx-auto sm:flex bg-lightBlue-600 sm:justify-center md:mt-8">
//             <div className="rounded-md shadow">
//               <Link 
//                 to="/apprenant/dashboard" 
//                 className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-BLACK bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
//               >
//                 Accéder au tableau de bord
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Landing;