import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sortAnecdotesByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote: (state, action) => {
      const id = action.payload
      console.log('Voting for an anecdote:', id)
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return sortAnecdotesByVotes(state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote)
      )
    },
    addAnecdote: (state, action) => {
      const anecdote = action.payload
      console.log('Adding an anecdote:', anecdote)
      state.push(anecdote)
    },
    setAnecdotes: (state, action) => {
      const anecdotes = action.payload
      console.log('Setting anecdotes:', anecdotes)
      return sortAnecdotesByVotes(anecdotes)
    }
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
