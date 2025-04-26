import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const sortAnecdotesByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote: (state, action) => {
      const updatedAnecdote = action.payload
      console.log('Updated vote count:', updatedAnecdote)
      return sortAnecdotesByVotes(state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
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

export const initializeAnecdotes = () => {
  console.log('Initializing anecdotes')

  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  console.log('Creating an anecdote:', content)

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  console.log('Voting for an anecdote:', id)

  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
