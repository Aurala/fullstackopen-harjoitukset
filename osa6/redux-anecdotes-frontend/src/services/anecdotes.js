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

const addVote = async (id) => {
  console.log('Adding a vote to anecdote with id:', id)
  const response = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { ...response.data, votes: response.data.votes + 1 }
  const updateResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  console.log('Updated anecdote:', updateResponse.data)
  return updateResponse.data
}

export default { getAll, createNew, addVote }
