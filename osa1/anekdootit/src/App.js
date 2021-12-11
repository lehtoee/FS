import React, { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = props => <h1>{props.text}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  

  const addVote = () => {
    const copy = [...array]
    copy[selected] += 1
    setArray(copy)
  }

  const [selected, setSelected] = useState(0)
  const [array = new Uint8Array(7), setArray] = useState()
  
  console.log(array)
  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <Button text="vote" handleClick={addVote} />
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor((Math.random() * 7) + 0))} />
    </div>
  )
}

export default App