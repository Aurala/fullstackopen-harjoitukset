import axios from 'axios'

const baseUrl = 'http://localhost:3003/api'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then(response => response.data)
}

const login = ({ username, password }) => {
  const request = axios.post(`${baseUrl}/login`, { username, password })
  return request.then(response => response.data)
}

const add = (blog) => {
  console.log('Token:', token)

  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }

  console.log('Adding blog:', blog)

  const request = axios.post(`${baseUrl}/blogs`, blog, headers)
  return request.then(response => response.data)
}

export default { getAll, login, setToken, add }
