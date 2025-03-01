import axios from 'axios'
const baseUrl = '/api/persons'

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

// Remove a person from the server
const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Update a person on the server
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }
