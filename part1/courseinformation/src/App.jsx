/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <>{props.course}</>
  )

}

const Content = (props) =>{
  return (
    <>{props.part} {props.exercise}</>
  )

}

const Total = (props) => {
return (
  <p>Number of exercises: {props.exercises1 + props.exercises2 + props.exercises3}</p>
)
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course = {course} />
      <p>
      <Content exercise={exercises1} part={part1} />
      </p>
      <p>
      <Content exercise={exercises2} part={part2} />
      </p>
      <p>
      <Content exercise={exercises3} part={part3} />
      </p>
      <Total  exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} />
    </>
  )
}

export default App