import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addUser } from "../../services/apiUser";
import { getFormationsGroupedByCategory } from "../../services/apiCategory";
import FormationDropdown from "components/Dropdowns/FormationDropdown";
import Cookies from "js-cookie";
const TUNISIAN_CITIES = [
  "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte",
  "Gabès", "Ariana", "Gafsa", "Monastir", "Ben Arous",
  "Nabeul", "Médenine", "Kasserine", "Kébili", "Mahdia",
  "Zaghouan", "Tozeur", "Siliana", "Jendouba", "Tataouine",
  "Manouba", "Beja", "Le Kef"
];

export default function Register() {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [ville, setVille] = useState("");
  const [cv, setCv] = useState(null);
  const [specialite, setSpecialite] = useState("");
  const history = useHistory();
  const [role, setRole] = useState("Apprenant");
  const [newAccount, setNewAccount] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    numTel: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setCv(e.target.files[0]);
  // };
 const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCv(file);
    } else {
      alert("Veuillez sélectionner un fichier PDF valide.");
      e.target.value = null; // Reset the input
    }
  };
  const handleRoleToggle = () => {
    const newRole = role === "Formateur" ? "Apprenant" : "Formateur";
    setRole(newRole);
    // Reset only role-specific fields
    setVille("");
    setSelectedFormation([]);
    setSpecialite("");
    setCv(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!newAccount.nom || !newAccount.prenom || !newAccount.email || !newAccount.password || !newAccount.numTel) {
        alert("Merci de remplir tous les champs obligatoires.");
        return;
      }

      // Role-specific validations
      

      if (role === "Formateur" && (!specialite || !cv)) {
        alert("Spécialité et CV sont obligatoires pour les formateurs");
        return;
      }

      const formData = new FormData();
      formData.append("nom", newAccount.nom);
      formData.append("prenom", newAccount.prenom);
      formData.append("email", newAccount.email);
      formData.append("password", newAccount.password);
      formData.append("numTel", newAccount.numTel);
      formData.append("role", role);
      

      if (role === "Apprenant") {
        formData.append("ville", ville);
        if (selectedFormation) {
          formData.append("formations", selectedFormation.titre); }
      } else {
        formData.append("specialite", specialite);
        formData.append("cv", cv);
      }

      
      const response = await addUser(formData);
      // Stockage dans les cookies après inscription
    const userData = {
      nom: newAccount.nom,
      prenom: newAccount.prenom,
      email: newAccount.email,
      ville: ville,
      role: role,
      formation: selectedFormation?.titre,
      specialite: role === "Formateur" ? specialite : undefined
    };

    // Stockage pour 7 jours
    Cookies.set('user_profile', JSON.stringify(userData), {
      expires: 7,
      secure: true,
      sameSite: 'strict'
    });
      
      
      console.log("Registration successful:", response.data);
      history.push(role === "Apprenant" ? "/auth/login" : "/auth/login");
      
    } catch (error) {
      console.error("Registration error:", error);
      alert("Erreur d'inscription: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    getFormationsGroupedByCategory()
      .then(data => setFormations(data))
      .catch(err => console.error("Erreur formations:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Inscrivez-vous en tant que {role}
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleRoleToggle}
                >
                  Basculer en {role === "Formateur" ? "Apprenant" : "Formateur"}
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                {/* Common fields */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Nom 
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={newAccount.nom}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre nom "
                    required
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Prenom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={newAccount.prenom}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre prenom"
                    required
                  />
                </div>
                {/* Student-specific fields */}
                {role === "Apprenant" && (
                  <>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Ville
                      </label>
                      <select
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      >
                        <option value="">Sélectionnez votre ville</option>
                        {TUNISIAN_CITIES.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Formations souhaitées
                      </label>
                      <FormationDropdown
                        formations={formations}
                        selectedFormation={selectedFormation}
                        setSelectedFormation={setSelectedFormation}
                      />
                      <small className="text-blueGray-400">
  {selectedFormation ? "1 formation sélectionnée" : "Aucune formation sélectionnée"}
</small>
                    </div>
                  </>
                )}

                {/* Instructor-specific fields */}
                {role === "Formateur" && (
                  <>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Spécialité
                      </label>
                      <input
                        type="text"
                        value={specialite}
                        onChange={(e) => setSpecialite(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Votre domaine d'expertise"
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  CV (PDF)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-blueGray-300 border-dashed hover:bg-blueGray-50 hover:border-blueGray-400 transition-all duration-150 rounded-md cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blueGray-400 group-hover:text-blueGray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-blueGray-400 group-hover:text-blueGray-600">
                        {cv ? cv.name : 'Téléversez votre CV (PDF)'}
                      </p>
                      {!cv && (
                        <p className="text-xs text-blueGray-400 mt-2">
                          Cliquez pour sélectionner un fichier
                        </p>
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileChange} 
                      className="hidden" 
                      required 
                    />
                  </label>
                </div>
                {cv && (
                  <div className="flex items-center mt-2 text-sm text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Fichier sélectionné: {cv.name}
                  </div>
                )}
                </div>
                  </>
                )}

                {/* Common fields continued */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="numero"
                    name="numTel"
                    value={newAccount.numTel}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newAccount.email}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre email"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newAccount.password}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>

                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150"
                  >
                    Créer un compte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}