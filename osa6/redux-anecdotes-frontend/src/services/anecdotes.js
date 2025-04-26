import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log('Creating a new anecdote:', content)
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  console.log('Response from server:', response.data)
  return response.data
}

export default { getAll, createNew }
