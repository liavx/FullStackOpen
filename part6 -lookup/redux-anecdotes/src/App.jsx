import Anecdotes from "./components/Anecdotes"
import CreateAnecdote from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(initializeAnecdotes())  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <CreateAnecdote />
    </div>
  )
}

export default App