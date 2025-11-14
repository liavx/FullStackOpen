import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'



const initialState = []

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState,
  reducers:{
    createAnecdote(state,action) {
      const content = action.payload
      state.push(content)
    },
    vote (state,action){
      const id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state,action){
      return action.payload
    }

  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    anecdoteService.getAll().then(anecdotes =>
      dispatch(setAnecdotes(anecdotes)))  
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    
  }
}

export const voteAnecdote = (content) =>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.vote(content.id,{...content, votes:content.votes+1})
    dispatch(vote(newAnecdote))
  }
}


export const {createAnecdote, vote , appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
