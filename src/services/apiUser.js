//cnx bin front w back sart ala rest api


import axios from 'axios'; //cest une outil djib data mn backend  

  const apiurl = 'http://localhost:5000/users';

  export async function getAllUsers(role) {  // async non bloqq khtr fonction bch tokhrj m serveur
    const params = role ? { role } : {};
    return await axios.get(`${apiurl}/getAllUsers`,{
      withCredentials: true,
      params,
    });
    
}

// export async function register(formData) {
//   return await axios.post(`${apiurl}/register`,formData)
// }
export async function addUser(formData) {
  return await axios.post(`${apiurl}/addUser`,formData,{
    withCredentials: true,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
}

// export async function addUtilisateur(userData) {
//   return await axios.post(`${apiurl}/addUtilisateur`,userData)
// }
export async function login(userData){
    
  return await axios.post(`${apiurl}/login`,userData,{
    withCredentials: true, // For cookies
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
    });
}
export async function deleteUsersById(id) {
  return await axios.delete(`${apiurl}/deleteUser/${id}`)
}

export async function getMyProfile(token) {
  
  return await axios.get(`${apiurl}/${token}`,{
    withCredentials: true, // For cookies

    //  headers: {
    //    Authorization: `Bearer ${token}`
    //  }
    });
}

export async function getAllFormateurs() {  // async non bloqq khtr fonction bch tokhrj m serveur
  return await axios.get(`${apiurl}/getAllFormateurs`,{
    withCredentials: true,
  });
 
}
export async function updateUser(userData,idUser) {
  return await axios.put(`${apiurl}/updateUser/${idUser}`,userData)
}


export async function updateProfile(userData,token) {
  return await axios.put(`${apiurl}/updateUser/${token}`,userData,{
  headers: {
    Authorization: `Bearer ${token}`
  }
});

}