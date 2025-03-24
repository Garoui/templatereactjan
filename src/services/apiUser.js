//cnx bin front w back sart ala rest api


import axios from 'axios';

  const apiURL = 'http://localhost:5000/users';

  export async function getAllUsers() {
    return await axios.get(`${apiURL}/getAllUsers`);
    
}
