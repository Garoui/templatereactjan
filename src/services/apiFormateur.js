// //cnx bin front w back sart ala rest api


 import axios from 'axios'; //cest une outil djib data mn backend  

   const apiurl = 'http://localhost:5000/users';

   export async function getAllFormateurs() {  // async non bloqq khtr fonction bch tokhrj m serveur
     return await axios.get(`${apiurl}/getAllFormateurs`);
    
 }


// import axios from 'axios'; // axios est un outil pour récupérer des données du backend

// const apiUrl = 'http://localhost:5000/users'; // Note: 'apiurl' should be 'apiUrl' (camelCase convention)

// export async function getAllFormateurs() {  // async car la fonction attend une réponse du serveur
//     try {
//         const response = await axios.get(`${apiUrl}/getAllFormateurs`);
//         return response.data; // On retourne généralement seulement les données de la réponse
//     } catch (error) {
//         console.error("Error fetching formateurs:", error);
//         throw error; // On propage l'erreur pour la gérer dans le composant appelant
//     }
// }