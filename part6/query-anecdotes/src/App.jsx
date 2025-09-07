import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery , useMutation , useQueryClient } from '@tanstack/react-query'
import {getAnecdote , updateAnecdote} from './services/requests'
import { useNotify} from './services/NotificationContext'



const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()


    const updateAnecdoteMutation = useMutation (
      {
        mutationFn:updateAnecdote,
        onSuccess: (newAnecdote) =>{
          const anecdotes = queryClient.getQueryData(['anecdotes'])
          const newAnec = anecdotes.map((anec) => anec.id == newAnecdote.id? newAnecdote: anec)
          queryClient.setQueryData(['anecdotes'], newAnec)
          notify('Anecdote voted')
        }, onError: () => notify('Voting failed')

      }
    )
    const addVote = (anecdote) =>{
      updateAnecdoteMutation.mutate({...anecdote,votes:anecdote.votes+1})
    }


  const result = useQuery ({
    queryKey: ['anecdotes'],
    queryFn: getAnecdote,
    refetchOnWindowFocus: false,
    retry:false
  })

  console.log(JSON.parse(JSON.stringify(result)))
  if(result.isLoading){
    return <div>loading data..</div>
  }

  if(result.isError){
    return <div>anecdote service is not available due to problems with the server</div>
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
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
