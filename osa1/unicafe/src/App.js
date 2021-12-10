import React, { useState } from 'react'


const Header = props => <h1>{props.text}</h1>

const Text = props => <div>{props.text} {props.value}</div>

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
      <Text text="good" value={good} />
      <Text text="neutral" value={neutral} />
      <Text text="bad" value={bad} />
    </div>
  )
}

export default App
