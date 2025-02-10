import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// Fetch all persons from the server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Add a person to the server
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export default { getAll, create }
