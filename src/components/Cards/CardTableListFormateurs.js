import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers, updateUserStatus } from "../../services/apiUser";
import { Modal, Button } from "antd";

export default function CardTableListFormateurs({ color }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);

  const getUsers = useCallback(async () => {
    try {
      const res = await getAllUsers("Formateur");
 const formateursWithDefaultStatus = res.data.formateurListe.map(user => ({
        ...user,
        Status: user.Status || "Actif"
      }));
      setUsers(formateursWithDefaultStatus);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleStatusChange = async (newStatus) => {
    try {
      if (!selectedUser) return;
      
      const updatedUser = await updateUserStatus(selectedUser._id, newStatus);
      const updatedUsers = users.map(user => 
        user._id === updatedUser._id ? updatedUser : user
      );
      
      setUsers(updatedUsers);
      setSelectedUser(updatedUser);
      setIsStatusModalVisible(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Actif": return "bg-green-100 text-green-800";
      case "Désactivé": return "bg-red-100 text-red-800";
      default: return "bg-green-100 text-green-800"; // Default to active color
    }
  };

  const openUserProfile = (user) => {
    setSelectedUser(user);
    setIsProfileModalVisible(true);
  };

  const getUserAvatar = (user) => {
    return user.image 
      ? `${process.env.REACT_APP_API_URL}/uploads/${user.image}`
      : `https://ui-avatars.com/api/?name=${user.nom}+${user.prenom}&background=random&size=128`;
  };

  return (
    <>
      <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
        color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"
      }`}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={`font-semibold text-lg ${
                color === "light" ? "text-blueGray-700" : "text-white"
              }`}>
                Liste des Formateurs
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Photo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nom
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Prénom
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Spécialité
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user => user.role === "Formateur").map((user) => (
                <tr key={user._id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <img
                        src={getUserAvatar(user)}
                        className="h-12 w-12 rounded-full border-2 border-blueGray-50 shadow"
                        alt={user.nom}
                      />
                    </div>
                  </td>
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
                    {user.specialite || "Non spécifié"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(user.Status)}`}>
    {user.Status || "Actif"} {/* Fallback to "Actif" if Status is undefined */}
  </span>
</td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => openUserProfile(user)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <Modal
          title={`Profil de ${selectedUser.prenom} ${selectedUser.nom}`}
          open={isProfileModalVisible}
          onCancel={() => setIsProfileModalVisible(false)}
          footer={[
            <Button 
              key="submit" 
              type="primary" 
              onClick={() => {
                setIsProfileModalVisible(false);
                getUsers();
              }}
            >
              Enregistrer
            </Button>,
            <Button 
              key="back" 
              onClick={() => setIsProfileModalVisible(false)}
            >
              Annuler
            </Button>
          ]}
          width={800}
        >
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex flex-col items-center">
                <img
                  src={getUserAvatar(selectedUser)}
                  className="h-24 w-24 rounded-full border-4 border-white shadow-lg mb-4"
                  alt={`${selectedUser.prenom} ${selectedUser.nom}`}
                />
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Informations du formateur
                </h6>
                <div className="relative mt-4">
                  <button
    type="button"
    className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${getStatusColor(selectedUser.Status)}`}
    onClick={() => setIsStatusModalVisible(true)}
  >
    {selectedUser.Status === "Actif" ? "Actif" : "Désactivé"}
  </button>
                </div>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Détails
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        ID Formateur
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser._id}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.nom}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.prenom}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Téléphone
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.numTel}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.ville || "Non renseigné"}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Spécialité
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.specialite || "Non spécifié"}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        CV
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedUser.cv || "Non disponible"}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Modal */}
      <Modal
    title="Modifier le statut"
    open={isStatusModalVisible}
    onCancel={() => setIsStatusModalVisible(false)}
    footer={null}
  >
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Choisissez le nouveau statut:
      </div>
      {[
        { value: "Actif", label: "Actif" },
        { value: "Désactivé", label: "Désactivé" }
      ].map((option) => (
        <div
          key={option.value}
          className={`p-3 rounded-md cursor-pointer ${getStatusColor(option.label)} hover:bg-opacity-70`}
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  </Modal>
    </>
  );
}

CardTableListFormateurs.defaultProps = {
  color: "light",
};

CardTableListFormateurs.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};