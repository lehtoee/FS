import React, { useState, useEffect } from 'react'
import numberService from './services/persons'
import axios from 'axios'

const Note = (props) => {
  return(
    <div>
      {props.name} {props.number}
    </div>
  )
}

const FilterForm = (props) => {
  return(
    <form>
        <div>
          filter shown with <input
          value={props.newFilter}
          onChange={props.handleFilterChange}/>
        </div>
      </form>
  )
}

const NewPersonForm = (props) => {
  return(
    <form onSubmit={props.addNewPerson}>
        <div>
          name: <input
          value={props.newName}
          onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const PersonsRendered = (props) => {
  return(
    <ul>
        {props.persons.map(object =>
          <Note key={object.name} name={object.name} number={object.number}/>
        )}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    numberService
      .getNumbers()
        .then(initialPersons => {
          console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const isThereSimilarity = persons.some(person =>
      person.name === newName)
    if(!isThereSimilarity){
      const nameObject = {
        name: newName,
        number: newNumber
      }
      numberService
        .createNumber(nameObject)
          .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')
        })
      }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
  }
    
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm handleFilterChange={handleFilterChange}
      newFilter={newFilter}/>

      <h3>add a new</h3>

      <NewPersonForm handleNumberChange={handleNumberChange}
      handleNameChange={handleNameChange}
      addNewPerson={addNewPerson}
      newName={newName}
      newNumber={newNumber}/>

      <h3>Numbers</h3>
      
      <PersonsRendered persons={persons.filter(person => person.name.toUpperCase() !== newFilter.toUpperCase())}/>
    </div>
  )

}

export default App