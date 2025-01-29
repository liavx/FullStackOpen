/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
const Header = (props) => <h1>{props.value}</h1>
const Button = (props) => <button onClick ={props.onClick}>{props.value}</button>
const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr> 
const Statistics = (props) => {
  if(props.totalSum == 0)
    return(
  <p>no feedback given</p>
  )
  return(
    <>
    <h1>Statistics</h1>
    <br/>
    <table>
      <tbody>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="Sum" value ={props.totalSum} />
    <StatisticLine text="Avg" value ={props.calculateAvg} />
    <StatisticLine text="Positive" value ={props.calculatePos} />
    </tbody>
    </table>
</>
  )
}
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
  const totalSum = () => good+bad+neutral
  const calculateAvg = () => (good - bad)/ totalSum()
  const calculatePos = () => good/totalSum()
  return (
    <div>
      <Header value ="give feedback" />
      <Button onClick = {() => handleClicks("good")} value = "good" />
      <Button onClick = {() => handleClicks("neutral")} value = "neutral" />
      <Button onClick = {() => handleClicks("bad")} value = "bad" /> 
      <Statistics totalSum = {totalSum()} calculateAvg ={calculateAvg()} calculatePos={calculatePos()}
        good = {good} bad = {bad} neutral = {neutral}  />
    </div>
  )
}

export default App