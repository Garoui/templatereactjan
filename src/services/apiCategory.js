import axios from 'axios'; //cest une outil djib data mn backend  

const apiurl = 'http://localhost:5001/category';


export async function getFormationsGroupedByCategory() {
    const response = await axios.get(`${apiurl}/getFormationsGroupedByCategory`);
    return response.data;
  }