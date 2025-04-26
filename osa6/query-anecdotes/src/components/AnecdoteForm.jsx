import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { showNotification } = useNotification()

  console.log('Context values:', useNotification())

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || 'Unknown error'
      console.error('Error creating anecdote:', error)
      showNotification('Adding an anecdote failed (check the length, must be >= 5)', 5)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('New anecdote:', content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
    showNotification(`Created anecdote '${content}'`, 5)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
