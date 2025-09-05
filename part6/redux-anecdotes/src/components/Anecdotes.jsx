/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'


const Anecdote = ({anecdote , onVote}) => {
    return(
    <div>
    {anecdote.content}
    &nbsp; has {anecdote.votes} votes &nbsp;
    <button onClick={() => onVote(anecdote.id)}>vote</button>
  </div>
    )
}

const Anecdotes = () =>{
   const dispatch = useDispatch ()
   const anecdotes = useSelector(({ filter, anecdotes }) => {
    const query = filter.trim().toLowerCase()
    return query === ''
      ? anecdotes
      : anecdotes.filter(a => a.content.toLowerCase().includes(query))
  })

   return (
    <div>
     {anecdotes.toSorted((a,b) => b.votes-a.votes).map(anecdote => (
        <Anecdote
        key={anecdote.id}
        anecdote = {anecdote}
        onVote = {() => {
          dispatch(voteAnecdote(anecdote))
          dispatch(showNotification(`${anecdote.content} was voted`))
        }}
        />)
    )}
    </div>
   )

}

export default Anecdotes

