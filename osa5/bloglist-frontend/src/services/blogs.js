import axios from 'axios'

const baseUrl = 'http://localhost:3003/api'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then(response => response.data)
}

const login = ({ username, password }) => {
  const request = axios.post(`${baseUrl}/login`, { username, password })
  return request.then(response => response.data)
}

export default { getAll, login, setToken }
