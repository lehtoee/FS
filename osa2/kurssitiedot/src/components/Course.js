import React from 'react'


const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

const Content = (props) => {
    return (
      <>
        <Part part={props.parts} />
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        {props.part.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
      </>
    )
  }
  
  const Header = (props) => {
    return (
      <>
        <h2>
          {props.course}
        </h2>
      </>
    )
  }
  
  const Total = (props) => {
    let totalAmount = props.parts.reduce((total, node) => {
      return total + node.exercises
    }, 0)
    return (
      <>
        <p style={{fontWeight:"bold"}}>
          Total of {totalAmount} exercises
        </p>
      </>
    )
  }
  
  
export default Course