
import React ,{useState} from "react";
import { Link } from "react-router-dom";
import {login} from "../../services/apiUser";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";


export default function Login() {
  
   
    const login2 = async () => {
      try {
        const res = await login(newAccount);
        Cookies.set("jwt_token_abir", res.data.token, { expires: 7 });
        Cookies.set("user_data", JSON.stringify(res.data.user), { expires: 7 });
    const role = res.data.user.role;
        if (role === "Apprenant") {
          history.push("/apprenant", { user: res.data.user });
        } else if (role === "Formateur") {
          history.push("/formateur");
        }
        
      } catch (err) {
        alert("Email ou mot de passe incorrect.");
        console.log("Erreur Front :", err.response?.data?.message || err.message);
      }
    };
    
  const history = useHistory();
  
   const [newAccount , setNewAccount] = useState({
     email:"",password:""
   })

   const handleChange = (e) => {
    const { name , value } = e.target;
     setNewAccount({...newAccount , [name]: value})
   }
 
  return (
    <>
    
      <div className="container mx-auto px-4 h-full">
        
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
  <div className="text-center mb-3">
    <h6 className="text-blueGray-500 text-sm font-bold">
      Connectez-Vous A Votre Compte
    </h6>
    <div className="text-blueGray-400 text-center mb-3 font-bold">
      <small>Se Connecter En Utilisant Les Réseaux Sociaux</small>
    </div>
  </div>
  <div className="btn-wrapper text-center">
    <ul className="flex flex-wrap justify-center list-none">
      <li className="flex items-center">
        <a
          className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="lg:text-blueGray-500 text-blueGray-500 fab fa-twitter text-lg leading-lg" />
          <span className="lg:hidden inline-block ml-2">Tweet</span>
        </a>
      </li>
      <li className="flex items-center">
        <a
          className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="lg:text-blueGray-500 text-blueGray-500 fab fa-instagram text-lg leading-lg" />
          <span className="lg:hidden inline-block ml-2">Instagram</span>
        </a>
      </li>
      <li className="flex items-center">
        <a
          className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="lg:text-blueGray-500 text-blueGray-500 fab fa-facebook text-lg leading-lg" />
          <span className="lg:hidden inline-block ml-2">Share</span>
        </a>
      </li>
      <li className="flex items-center">
        <a
          className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&title=Notus%20React&summary=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin."
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="lg:text-blueGray-500 text-blueGray-500 fab fa-linkedin text-lg leading-lg" />
          <span className="lg:hidden inline-block ml-2">Share</span>
        </a>
      </li>
    </ul>
  </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou Connectez-vous avec vos identifiants</small>
                </div>
                <form>
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
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}

                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Mémoriser mes informations
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault(); // éviter le rechargement de la page
                        login2();
                      }}
                    >
                      Se connecter
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link 
                  to="/auth/ForgotPassword"
                  className="text-blueGray-200"
                >
                  <small>Mot de passe oublié?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Créer un nouveau compte</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
}
