import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../../services/apiUser";
import { useHistory } from "react-router-dom";
import { getAllFormations } from "../../services/apiFormation"; // adapte le chemin selon ton projet

export default function Register() {
  const [formations, setFormations] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState([]);
  const history = useHistory();
  const [role, setRole] = useState("Etudiant")
  const [newAccount, setNewAccount] = useState({
    nom: "", email: "", password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const addData = async () => {
    try {
      const dataToSend = { ...newAccount, role, formations: selectedFormations };
      console.log("Données envoyées :", dataToSend);
      await addUser(dataToSend).then(() => {
        if (role === "etudiant") {
          history.push("/profile");
        } else {
          history.push("/auth/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormationChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedFormations(options);
  };



  useEffect(() => {
    getAllFormations()
      .then((data) => setFormations(data))
      .catch((err) => console.log(err));
  }, []);



  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Inscrivez-vous avec             {role === "formateur" ? (<div>Etudiant</div>) : (<div>Formateur</div>)}

                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { setRole(role === "formateur" ? "etudiant" : "formateur") }}

                  >
                    {role === "formateur" ? (<div>Etudiant</div>) : (<div>Formateur</div>)}

                  </button>

                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou inscrivez-vous avec vos identifiants</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      nom
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="nom"
                      name="nom"
                      onChange={handleChange}
                    />
                  </div>
                  {role === "formateur" && (
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Cv
                      </label>
                      <input
                        type="file"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Cv"
                        name="cv"
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  {role === "formateur" && (
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Specialite
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="specialite"
                        name="specialite"
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mot De Passe
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="mot de Passe"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  {role === "etudiant" && (
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Formations souhaitées
                      </label>
                      <select
                        multiple
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleFormationChange}

                      >
                        {formations.map((formation) => (
                          <option key={formation._id} value={formation._id}>
                            {formation.nom}
                          </option>
                        ))}
                      </select>
                    </div>

                  )}

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        J'accepte{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          La Politique De Confidentialité
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => { addData(newAccount) }}
                    >
                      Créer un compte
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link
                  to="/auth/forget"
                  className="text-blueGray-200"
                >
                  <small>Mot de passe oublié</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small>Se connecter</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
