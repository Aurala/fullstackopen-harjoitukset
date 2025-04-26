import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAdd = async (event) => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    console.log('Adding an anecdote:', anecdoteText)
    if (anecdoteText.length > 0) {
      const newAnecdote = await anecdoteService.createNew(anecdoteText)
      console.log('The new anecdote:', newAnecdote)
      dispatch(addAnecdote(newAnecdote))
      dispatch(showNotification(`Anecdote "${newAnecdote.content}" added`, 5))
      event.target.anecdote.value = ''
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
