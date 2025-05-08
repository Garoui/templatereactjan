import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers, addUser } from "../../services/apiUser";//djib data
// components



export default function CardTableListUsers({ color }) {
  const [users, setUsers] = useState([]);
  

  const getUsers = useCallback(async () => {
        try {
          console.log("fetching Apprenants... :");
          const res = await getAllUsers("Apprenant");
            console.log(res);
            setUsers(res.data.apprenantListe)
         
        } catch (error) {
          console.log(error)
        }
      }, []);



  // const deleteUser = async (userId) => {
  //   try {
  //     await deleteUsersById(userId);
  //     await getUsers();
  //   } catch (error) {
  //     if (error.response) {
  //       console.log('Erreur serveur :', error.response.data);
  //     } else if (error.request) {
  //       console.log('Aucune réponse du serveur');
  //     } else {
  //       console.log('Erreur inconnue :', error.message);
  //     }
  //   }};



  useEffect(() => {
    getUsers();
  }, [getUsers]); //useffect tkhalik awell m todkhel l sit y3abilk data l hachtek beha
  //------------------add--------------
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    numTel: "",
    formations: "",
    role: "Apprenant"
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value })

  }

  //fonction botton dajout
  const AddNewUser = async () => {
      try {
        console.log("Sending user:", newUser);
        await addUser(newUser);
        getUsers();
        setNewUser({
          nom: "",
          prenom: "",
          email: "",
          password: "",
          numTel: "",
          formations: "",
          role: "Apprenant"
      
        });
        alert("User added successfully");
  
      } catch (error) {
        console.log(error.response?.data || error.message);

        alert("Error adding user");
      }
    };
  

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Liste d'Apprenants
              </h3>
              <div>
                <input type="text" placeholder="nom" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="nom" onChange={handleChange} />
                <input type="text" placeholder="prenom" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="prenom" onChange={handleChange} />
                <input type="text" placeholder="numTel" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="numTel" onChange={handleChange} />
                <input type="email" placeholder="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="email" onChange={handleChange} />
                 {/* <input type="password" placeholder="password" name="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  onChange={handleChange} />  */}
                {/* <input type="text" placeholder="formations" name="formations" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-900  rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  onChange={handleChange} />  */}
                <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-3 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  onClick={() => { AddNewUser(newUser) }}>Ajouter</button>

              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  nom
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  prenom
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  type de formation
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  id
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >  numTel
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  
                   Status 
                </th>
              </tr>
            </thead>
            <tbody>
            {users.filter(user => user.role === "Apprenant").map((user) => (
                <tr key={user._id}>


                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                    {user.nom}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.prenom}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.formations?.map(f => f.titre).join(", ") || "Aucune formation"}
                  </td>
                  {/* {user.formations?.map(f => f.titre).join(", ")|| "Aucune formation"} */}

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user._id}
                  </td>

                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {user.numTel}
                </td> 
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.Status}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      style={{ color: "#4a5568" }}
                      onClick={() => {
                        setNewUser(user)
                      }}
                    >
                      Modifier
                    </button>
                    {/* <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      style={{ color: "#4a5568" }}
                      onClick={() => {
                        setNewUser(user)
                      }}
                    >
                      update password
                    </button> */}
                    {/* <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      style={{ color: "#4a5568" }}
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      Supprimer
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

CardTableListUsers.defaultProps = {
  color: "light",
};

CardTableListUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};