import { useDispatch} from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'

const CreateAnecdote = () => {

const dispatch = useDispatch ()

const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  dispatch(createAnec(content))  
  dispatch(showNotification(`${content} was added`))
}

return (
    <div>
    <h2>create new</h2>
    <form onSubmit = {addAnecdote} >
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
    </div>
)

}

export default CreateAnecdote