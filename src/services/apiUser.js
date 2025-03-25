//cnx bin front w back sart ala rest api


import axios from 'axios'; //cest une outil djib data mn backend  

  const apiurl = 'http://localhost:5000/users';

  export async function getAllUsers() {  // async non bloqq khtr fonction bch tokhrj m serveur
    return await axios.get(`${apiurl}/getAllUsers`);
    
}
