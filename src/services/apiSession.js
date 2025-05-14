import axios from 'axios';
const apiurl = 'http://localhost:5000/session';


  export async function getFormateurSessions() {
    return await axios.post(`${apiurl}/getFormateurSessions`);
  }


  export async function createLiveSession(sessionData) {
    return await axios.post(`${apiurl}/createLiveSession`, sessionData);
  }