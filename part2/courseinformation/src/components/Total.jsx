/* eslint-disable react/prop-types */
const Total = ({parts}) => {
    return (
      <p>Number of exercises: {parts.reduce((sum,part) => sum +part.exercises,0)}</p>
    )
    }

    export default Total
    