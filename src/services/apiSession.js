 import axios from 'axios';
const apiurl = 'http://localhost:5000/session';

export async function getSessions() {
  return await axios.get(`${apiurl}/`, { withCredentials: true });
}

export async function getSessionById(id) {
  return await axios.get(`${apiurl}/${id}`, { withCredentials: true });
}

export async function getApprenantSessions() {
  return await axios.get(`${apiurl}/`, { 
    withCredentials: true 
  });
}

export async function getFormateurSessions() {
  return await axios.get(`${apiurl}/`, { 
    withCredentials: true 
  });
}

export async function createSession(sessionData) {
  return await axios.post(`${apiurl}/createSession`, sessionData, { withCredentials: true });
}

export async function updateSession(id, sessionData) {
  return await axios.put(`${apiurl}/${id}`, sessionData, { withCredentials: true });
}

export async function deleteSession(id) {
  return await axios.delete(`${apiurl}/${id}`, { withCredentials: true });
}

export async function startVideoConference(sessionId) {
  return await axios.post(`${apiurl}/${sessionId}/start-conference`, null, { 
    withCredentials: true 
  });
}
export const getSessionsWithStatus = async (userId, role) => {
  const endpoint = role === 'Formateur' 
    ? 'formateur/sessions' 
    : `apprenant/${userId}/sessions`;
  
  const res = await axios.get(`${apiurl}/${endpoint}`, {
    params: {
      withStatus: true,
      timestamp: new Date().getTime()
    },
    withCredentials: true
  });
  return res.data;
};

