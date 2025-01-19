/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
const Header = (props) => <h1>{props.value}</h1>
const Button = (props) => <button onClick ={props.onClick}>{props.value}</button>
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClicks =(props) =>{
    if(props == "neutral")
      setNeutral(neutral+1)
    if(props == "good")
      setGood(good+1)
    if(props == "bad")
      setBad(bad+1)
  }

  return (
    <div>
      <Header value ="give feedback" />
      <Button onClick = {() => handleClicks("good")} value = "good" />
      <Button onClick = {() => handleClicks("neutral")} value = "neutral" />
      <Button onClick = {() => handleClicks("bad")} value = "bad" /> 
      <Header value ="statistics" />
      {good} {neutral} {bad}
    </div>
  )
}

export default App