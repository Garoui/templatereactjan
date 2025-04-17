import axios from 'axios'; // c'est un outil pour récupérer les données depuis le backend

const apiUrl = 'http://localhost:3000/FormationRoute';

export async function getAllFormations() { // async : fonction asynchrone pour récupérer les données du serveur
  return await axios.get(`${apiUrl}/getAllFormation`); // on récupère toutes les formations
}