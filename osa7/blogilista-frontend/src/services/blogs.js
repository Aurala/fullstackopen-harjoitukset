import axios from 'axios'

const baseUrl = 'http://localhost:3003/api'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then((response) => response.data)
}

const login = ({ username, password }) => {
  const request = axios.post(`${baseUrl}/login`, { username, password })
  return request.then((response) => response.data)
}

const addBlog = (blog) => {
  console.log('Token:', token)

  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }

  console.log('Adding blog:', headers, blog)

  const request = axios.post(`${baseUrl}/blogs`, blog, headers)
  return request.then((response) => response.data)
}

const updateBlog = (blog) => {
  console.log('Token:', token)

  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }

  console.log('Updating blog:', headers, blog)

  const request = axios.put(`${baseUrl}/blogs/${blog.id}`, blog, headers)
  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  console.log('Token:', token)

  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }

  console.log('Deleting blog:', headers, id)

  const request = axios.delete(`${baseUrl}/blogs/${id}`, headers)
  return request.then((response) => response.data)
}

export default { getAllBlogs, login, setToken, addBlog, updateBlog, deleteBlog }
