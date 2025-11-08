import { useMutation , useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useNotify} from '../services/NotificationContext'

const AnecdoteForm = () => {
  const notify = useNotify()



  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation (
    {mutationFn:createAnecdote,
      onSuccess: (newAnecdote) =>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        notify('Added Successfully')
      },
      onError: (err) => {
        notify(err?.response?.data?.error || 'Failed to add anecdote')
      }
      })

    const addAnecdote = async (event) =>{
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ""
      newAnecdoteMutation.mutate(content)     
    }

  return ( 
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
