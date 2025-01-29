/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
const Header = (props) => <h1>{props.value}</h1>
const Button = ({value,handleClicks}) => <button onClick = {() => handleClicks((summ) => summ +1)}>{value}</button>
const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr> 
const Statistics = ({values}) => {
  const total = values.reduce ((sum,value) => sum + value , 0)
  const positive = (100 * values[0] / total)
  if(total == 0)
    return(
  <p>no feedback given</p>
  )
  return(
    <>
    <h1>Statistics</h1>
    <br/>
    <table>
      <tbody>
    <StatisticLine text="good" value ={values[0]} />
    <StatisticLine text="bad" value ={values[2]} />
    <StatisticLine text="neutral" value ={values[1]} />
    <StatisticLine text="Sum" value ={total} />
    <StatisticLine text="Avg" value ={total/3} />
    <StatisticLine text="Positive" value ={`${positive}%`} />
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

  return (
    <div>
      <Header value ="give feedback" />
      <Button handleClicks = {setGood} value = "good" />
      <Button handleClicks = {setNeutral} value = "neutral" />
      <Button handleClicks = {setBad} value = "bad" /> 
      <Statistics values = {[good , neutral , bad]} />
    </div>
  )
}

export default App