import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAdd = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if (anecdote.length > 0) {
      console.log('anecdote:', anecdote)
      dispatch(addAnecdote(anecdote))
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
