/* eslint-disable react/prop-types */
import { useState } from 'react'
const Button =(props) =>{
  return(
  <button onClick={props.onClick}>{props.value}</button>
  )
}
const Header = (props) => <h1>{props.value}</h1>
const MostVoted = (props) => {
  const biggest = Math.max(...props.clickCounts)
  const index = props.clickCounts.indexOf(biggest);
  if(biggest == 0)
    return (
  <>nothing has been voted yet </>
    )
  else
  return (
<>{props.anecdotes[index]}
 <p>has {props.clickCounts[index]} votes </p>
</>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [clickCounts, setClickCounts] = useState(new Array(anecdotes.length).fill(0));
  const randomClick = () =>{
  setSelected(Math.floor(Math.random ()* anecdotes.length))
  console.log(selected)
  }
  const vote = () =>{
    const temp = [...clickCounts]
    temp[selected] += 1
    setClickCounts(temp)
  }
  return (
    <div>
      <Header value ="Anecdote of the day" />
     <Button onClick={() => randomClick()} value="next anecdote" />
     <Button onClick={() => vote()} value="vote" />
      <br/>
     {anecdotes[selected]}
     <p>has {clickCounts[selected]} votes</p>
     <br/>
     <Header value = "Anecdote with most votes" />
     <MostVoted clickCounts = {clickCounts} anecdotes = {anecdotes} / >
    </div>
  )
}

export default App