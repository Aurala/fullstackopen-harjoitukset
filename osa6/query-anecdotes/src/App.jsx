import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotification } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const { showNotification } = useNotification()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(
        anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ))
    }
  })

  const handleVote = (anecdote) => {
    console.log('Voting for anecdote:', anecdote)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log('Updated anecdote:', updatedAnecdote)
    updateAnecdoteMutation.mutate(updatedAnecdote)
    showNotification(`You voted for '${anecdote.content}'`, 5)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log('Data fetched from the server:', JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
