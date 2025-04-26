import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addUser } from "../../services/apiUser";
import { getFormationsGroupedByCategory } from "../../services/apiCategory";
import FormationDropdown from "components/Dropdowns/FormationDropdown";
// List of Tunisian cities for the dropdown
const TUNISIAN_CITIES = [
  "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte",
  "Gabès", "Ariana", "Gafsa", "Monastir", "Ben Arous",
  "Nabeul", "Médenine", "Kasserine", "Kébili", "Mahdia",
  "Zaghouan", "Tozeur", "Siliana", "Jendouba", "Tataouine",
  "Manouba", "Beja", "Le Kef"
];

export default function Register() {

  const [formations, setFormations] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState([]);
  const [ville, setVille] = useState("");
  const [cv, setCv] = useState(null);
  const [specialite, setSpecialite] = useState("");
  const history = useHistory();
  const [role, setRole] = useState("Etudiant");
  const [newAccount, setNewAccount] = useState({
    nom: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

 

  const addData = async () => {
    try {
      const formData = new FormData();
      formData.append("nom", newAccount.nom);
      formData.append("email", newAccount.email);
      formData.append("password", newAccount.password);
      formData.append("role", role);

      if (role === "Etudiant") {
        formData.append("ville", ville);
        selectedFormations.forEach(f => formData.append("formations", f));
      } else if (role === "Formateur") {
        formData.append("specialite", specialite);
        if (cv) formData.append("cv", cv);
      }

      await addUser(formData);
      history.push(role === "Etudiant" ? "/profile" : "/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    getFormationsGroupedByCategory()
      .then(data => {
        // data est déjà sous la forme [{ categorie, formations: [...] }]
        setFormations(data);
      })
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
                  onClick={() => setRole(role === "Formateur" ? "Etudiant" : "Formateur")}
                >
                  Basculer en {role === "Formateur" ? "Etudiant" : "Formateur"}
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                {role === "Etudiant" && (
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
                        selectedFormations={selectedFormations}
                        setSelectedFormations={setSelectedFormations}
                      />

                      <small className="text-blueGray-400">
                        {selectedFormations.length} formation(s) sélectionnée(s)
                      </small>
                    </div>
                  </>
                )}

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
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
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
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Votre mot de passe"
                    required
                    minLength="6"
                  />
                </div>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={addData}
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
