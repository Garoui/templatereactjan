 import MainNavbar from 'components/Navbars/MainNavbar';

 import React, { useState, useEffect } from "react";
// import Navbar from "components/Navbars/AuthNavbar.js";
 import Footer from "components/Footers/Footer.js";
 import { updateProfile } from "../services/apiUser";
 import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
 import Cookies from 'js-cookie';
import backgroundImage from "assets/img/profill.png";


//import { render, screen } from '@testing-library/react';
// Profile Picture Upload Component
 const ProfilePictureUpload = ({ currentImage, setImage }) => {
   const handleImageChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       setImage(URL.createObjectURL(file)); // Preview image
     }
   };
  // test('affiche le nom de l\'utilisateur', () => {
  //   render(<Profile />);
  //   const userName = screen.getByText(/Nom/i);
  //   expect(userName).toBeInTheDocument();
  // });
   return (
    <div className="relative group">
       <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
         {currentImage ? (
           <img src={currentImage} alt="Profile" className="object-cover w-full h-full" />
         ) : (
           <div className="bg-gray-300 w-full h-full flex items-center justify-center text-white text-4xl">+</div>
         )}
       </div>
       <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer transform transition-all duration-200 hover:bg-blue-700 hover:scale-110">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
           <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
         </svg>
         <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
       </label>
     </div>
   );
 };

 export default function Profile() {
  const [image, setImage] = useState("photodeprofile.png");
   const [user, setUser] = useState(null);
   const history = useHistory();
   const [editMode, setEditMode] = useState(false);
  //   useEffect(() => {
    
    
  //     const token = Cookies.get('jwt_token_abir'); // Retrieve the token from cookies
  //    if (token) {
     
      
  //      // Then fetch fresh data from API
  //      getUserByID(token)
  //         .then((res) => {
  //           if (res.data && res.data.user) {
  //             setUser(res.data.user); // Set the user data if found
  //          }
         
  //         })
  //         .catch((err) => {
  //           console.error("Erreur lors du chargement des infos utilisateur :", err);
          
          
  //         });
  //     } else {
  //       // If no user in cookies, redirect to login
  //       history.push("/profile");
  //     }
  //  }, [history]);
  // useEffect(() => {
  //   const token = Cookies.get('jwt_token_abir');
  //   const userData = Cookies.get('user_data');
    
  //   if (token && userData) {
  //     const userParsed = JSON.parse(userData);
  //     setUser(userParsed);
  //     setImage(userParsed.photo || "photodeprofile.png"); // optional
  //   } else {
  //     history.push("/login"); // redirect if not authenticated
  //   }
  // }, [history]);
  
   useEffect(() => {
     // Retrieve the user information from cookies
     const token = Cookies.get('jwt_token_abir'); // Retrieve the token from cookies
     const userData = Cookies.get('user_data'); // Retrieve user data (you should set this data on login)
    
   if (!token && userData) {
     try {
      // Parse the user data and set it
      const user = JSON.parse(userData);
      setUser(user);
      setImage(user.photo || "photodeprofile.png"); // Optional profile image
    } catch (error) {
      console.error("Error parsing user data:", error);
      history.push("/auth/login"); // Redirect to login if userData is invalid
    }
  } else {
    // If no user or token, redirect to login
    history.push("/auth/login");
  }
}, [history]);


// components
const handleSave = async () => {
  const token = Cookies.get('jwt_token_abir');
  if (!token) {
    alert("Please login first");
    return;
  }

  // Check password match if changing password
  if (user.password && user.password !== user.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    await updateProfile(user, token);
    setEditMode(false);
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Update error:", error);
    alert(error.response?.data?.message || "Error updating profile");
  }
};

  return (
    <>
     <main className="profile-page">
         <section className="relative block h-500-px">
           <div
             className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                           backgroundImage: `url(${backgroundImage})`,
                           zIndex: 0
                         }}
           >
            <MainNavbar/>
           </div>
         </section>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mon profil</h6>

          
                 <div className="flex flex-wrap justify-center">
                   <div className="w-full lg:w-3/12 px-4 lg:order-2 flex  justify-center">
                     <ProfilePictureUpload currentImage={image} setImage={setImage} />
                   </div>
            
            {/* <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
             modifier
            </button> */}
             {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-lightBlue-500 text-white font-bold text-xs px-4 py-2 rounded mt-2"
          >
            Modifier mes informations
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-500 text-black font-bold text-xs px-4 py-2 rounded mt-2"
          >
            Enregistrer
          </button>
        )}
          </div>
        </div>
        </div>
        
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
               Informations Personelle
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    numero de telephone
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.numTel || ""}
                    onChange={(e) => setUser({ ...user, numTel: e.target.value })}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   nouveau mot de pass
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                  />
                </div>
              </div>
             <div className="w-full lg:w-6/12 px-4">
  <div className="relative w-full mb-3">
    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      Confirm Password
    </label>
    <input
      type="password"
      onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    />
  </div>
</div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Nom
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.nom || ""}
                    onChange={(e) => setUser({ ...user, nom: e.target.value })}

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Prenom
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.prenom || ""}
                    onChange={(e) => setUser({ ...user, prenom: e.target.value })}

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.ville || ""}
                    onChange={(e) => setUser({ ...user, ville: e.target.value })}

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Formation
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.formations?.[0]?.titre || "non specifié"} // if it's an array

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                  />
                </div>
              </div>
            </div>
            
          </form>
          <div>
          <hr></hr>  
          <hr></hr>
          <hr></hr>  
          <hr></hr>
          <hr></hr>  
          <hr></hr><hr></hr>  
          <hr></hr>
          <hr></hr>  
          <hr></hr>
          <hr></hr>  
          <hr></hr>

          <hr></hr>  
          <hr></hr>
          <hr></hr>  
          <hr></hr>
          <hr></hr>  
          
          
          

          </div>
          
        </div>
      </div>
      </main>
      <Footer/>
    </>
  );
}
