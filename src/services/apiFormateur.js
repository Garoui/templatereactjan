// //cnx bin front w back sart ala rest api


 import axios from 'axios'; //cest une outil djib data mn backend  

   const apiUrl = 'http://localhost:5001/users';

   export async function getAllFormateurs() {  // async non bloqq khtr fonction bch tokhrj m serveur
     return await axios.get(`${apiUrl}/getAllFormateurs`);
    
 }
