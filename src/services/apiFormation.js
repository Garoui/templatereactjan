import axios from 'axios'; // c'est un outil pour récupérer les données depuis le backend

const apiUrl = 'http://localhost:5000/formations';

export async function getAllFormation() { // async : fonction asynchrone pour récupérer les données du serveur
  return await axios.get(`${apiUrl}/getAllFormation`); // on récupère toutes les formations
}

export async function getMyFormation() {
  //const token = localStorage.getItem('jwt_token'); 
  return await axios.get(`${apiUrl}/getMyFormation`,{
  withCredentials: true, // For cookies
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
  });
}

export async function getFormationById(courseId) {
  return await axios.get(`${apiUrl}/${courseId}`);
}

export async function getFormationChapters(courseId) {
  return await axios.get(`${apiUrl}/${courseId}/chapters`);
}

export async function createFormation(courseData) {
  return await axios.post(`${apiUrl}/create`, courseData);
}

export async function updateFormation(courseId, updatedData) {
  return await axios.put(`${apiUrl}/${courseId}`, updatedData);
}

export async function deleteFormation(courseId) {
  return await axios.delete(`${apiUrl}/${courseId}`);
}

// Enrollment functions
export async function enrollInFormation(courseId) {
  return await axios.post(`${apiUrl}/${courseId}/enroll`);
}

export async function getEnrolledFormation() {
  return await axios.get(`${apiUrl}/enrolled`);
}