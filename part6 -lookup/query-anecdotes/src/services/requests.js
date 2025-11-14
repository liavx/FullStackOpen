import axios from 'axios'

const baseUrl ='http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)
export const getAnecdote = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => 
  axios.post(baseUrl,{content:newAnecdote,id:getId(),votes:0}).then(res=>res.data)

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
