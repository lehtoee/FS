import React, { useState } from 'react'

const StatisticLine = (props) => {
  console.log(props.length)
  if(props.text === "average"){
    return(
      <>
        <div>{props.text} {props.dividend / props.sum} </div>
      </>
    )
  }
  else if(props.text === "positive"){
    return(
      <>
        <div>{props.text} {props.dividend / props.sum * 100} {" %"} </div>
      </>
    )
  }
  else{
    return(
      <>
        <div>{props.text} {props.value} </div>
      </>
    )
  }
}

const Statistics = (props) => {
  if(props.bad > 0 || props.good > 0 || props.neutral > 0 ){
    return(
      <>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.bad + props.neutral} />
        <StatisticLine text="average" sum={props.good + props.bad + props.neutral} dividend={props.good - props.bad} />
        <StatisticLine text="positive" sum={props.good + props.bad + props.neutral} dividend={props.good} />
      </>
    )
  }
  else{
    return(
      <>
        <div>No feedback given</div>
      </>
    )
  }
}

const Header = props => <h1>{props.text}</h1>

const Button = props => <button onClick={props.handleClick}>
  {props.text}
</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}

export default App
