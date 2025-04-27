import React, { useState, useEffect } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { getUserById } from "../services/apiUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//import Profile from '../'

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
  useEffect(() => {
    // First try to get user from localStorage
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Then fetch fresh data from API
      getUserById(parsedUser._id)
        .then((res) => {
          setUser(res.data);
          // Update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Erreur lors du chargement des infos utilisateur :", err);
          // Fallback to stored user if API fails
          setUser(parsedUser);
        });
    } else {
      // If no user in localStorage, redirect to login
      history.push("/profile");
    }
  }, [history]);



  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url(" + require("assets/img/backof14.jpg").default + ")",
            }}
          >
           
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-lightBlue-800 w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex  justify-center">
                    <ProfilePictureUpload currentImage={image} setImage={setImage} />
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-3  lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 ">
                      <button className="bg-emerald-500 active:bg-emerald-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
                        Modifier Profil
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-100">5</span>
                        <span className="text-sm text-blueGray-100">Certificats</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-100">3</span>
                        <span className="text-sm text-blueGray-100">Cours terminés</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-100">1</span>
                        <span className="text-sm text-blueGray-100">Badge</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 👤 User Info */}
                {user && (
                  <div>
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-100">
                      {`${user.nom} ${user.prenom || ""}`}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {user.ville || "Ville inconnue"}
                    </div>
                    <div className="mb-2 text-blueGray-400 mt-10">
                      <i className="fas fa-graduation-cap mr-2 text-lg text-blueGray-400"></i>
                      {user.formation ? `Étudiant(e) en ${user.formation}` : "Formation non spécifiée"}
                    </div>
                    <div className="mb-2 text-blueGray-400">
                      <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                      {user.email || "Email non disponible"}
                    </div>
                  </div>
                )}


                {/* ✍️ Account Settings */}
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-100">
                        Bienvenue sur votre profil étudiant. Suivez vos progrès,
                        consultez vos certificats, badges, et reprenez vos cours à tout moment.
                        Cette plateforme e-learning vous accompagne vers la réussite.
                      </p>
                      <a href="#!" className="font-normal text-emerald-500" onClick={(e) => e.preventDefault()}>
                        Voir mes cours
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⚙️ Account Settings Form */}
        <section className="relative py-16 bg-blueGray-100">
          <div className="container  mx-auto px-4">
            <div className="bg-lightBlue-800 shadow-xl rounded-lg p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-blueGray-100  mb-6">Paramètres du compte</h2>
              <form className="space-y-6 ">
                <div>
                  <label className="block text-sm font-medium text-blueGray-100 mb-1">Adresse e-mail</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full rounded-md border border-blueGray-100 p-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blueGray-100 mb-1">Mot de passe actuel</label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-blueGray-100 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Mot de passe actuel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blueGray-100 mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-blueGray-100 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-black font-bold py-3 px-8 rounded-lg shadow-lg border-2">
                    Mettre à jour
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
