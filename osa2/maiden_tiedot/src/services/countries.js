import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

// Fetch all countries from the server
const getAll = () => {
  const request = axios.get(baseUrl + '/api/all')
  return request.then(response => response.data)
}

export default { getAll }
