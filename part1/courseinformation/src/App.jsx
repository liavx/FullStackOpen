/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )

}

const Part = (props) =>{
  return(
<p>
  {props.part} {props.exercise}
</p>
  )
}

const Content = (props) =>{
  return (
    <>
    <Part part = {props.parts[0].name} exercise = {props.parts[0].exercise}/>
    <Part part = {props.parts[1].name} exercise = {props.parts[1].exercise} />
    <Part part = {props.parts[2].name} exercise = {props.parts[2].exercise} />
    </>
  )

}

const Total = (props) => {
return (
  <p>Number of exercises: {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
)
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name:"Fudamentls of React",
     exercise:10
    },
    {
      name:"Using props to pass data",
      exercise:7
    },
    {
      name:"State of component",
      exercise:14
    }
  ]


  return (
    <>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </>
  )
}

export default App