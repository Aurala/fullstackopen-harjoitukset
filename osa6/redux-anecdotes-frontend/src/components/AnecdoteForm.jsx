import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAdd = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('Adding an anecdote:', anecdote)
    if (anecdote.length > 0) {
      dispatch(createAnecdote(anecdote))
      dispatch(showNotification(`Anecdote "${anecdote}" added`, 5))
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
