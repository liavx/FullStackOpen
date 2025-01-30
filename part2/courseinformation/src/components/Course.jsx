/* eslint-disable react/prop-types */
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    return (
      <>
      {course.map ((courses) =>
      <div key={courses.id}>
      <Header course = {courses.name} />
      <Content parts = {courses.parts} />
      <Total parts = {courses.parts} />
      </div>
     )}
     </>
    )
  }
  export default Course