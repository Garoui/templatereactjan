
// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { Plus, Edit } from 'react-feather';

// const FormateurCourses = () => {

//   const [user, setUser] = useState(null);

// const [data, setData] = useState({
//     courses: [
//       { id: 1, title: "Français Débutant", students: 15 },
//       { id: 2, title: "Communication Professionnelle", students: 8 }
//     ],

  
//   });

//   useEffect(() => {
//     const userInfo = Cookies.get('user_data');
//     if (userInfo) setUser(JSON.parse(userInfo));
//   }, []);


//   return (
//     <div>
//       <div className="space-y-6">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-2xl font-bold">Mes Cours</h2>
//                     <button className="bg-blue-600 text-black px-4 py-2 rounded-lg flex items-center">
//                       <Plus size={18} className="mr-2" />
//                       Nouveau Cours
//                     </button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {data.courses.map(course => (
//                       <div key={course.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
//                         <h3 className="font-bold text-lg mb-2">{course.title}</h3>
//                         <p className="text-gray-600 mb-4">{course.students} étudiants inscrits</p>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-500">Créé le 15/05/2023</span>
//                           <button className="text-blue-600 hover:text-blue-800">
//                             <Edit size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   </div>
//     </div>
//   );
// };

// export default FormateurCourses;