import React, { useState, useEffect } from 'react'
import numberService from './services/persons'


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

const Notification = (props) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    background: 'lightblue',
    fontWeight: 'bold'
  }

  const notificationErrorStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    background: 'lightblue',
    fontWeight: 'bold'
  }

  if (props.message === null) {
    return null
  }

  if(props.message.includes('Information')){
    return (
      <div style={notificationErrorStyle}>
        {props.message}
      </div>
    )
  }
  else {
    return (
      <div style={notificationStyle}>
        {props.message}
      </div>
    )
  }
}

const PersonsRendered = (props) => {
  return(
    <ul>
        {props.persons.map(object =>
          <div key={object.id}>{object.name} {object.number} <button onClick={() => props.deletePerson(object)}>delete</button></div>
        )}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)


  useEffect(() => {
    numberService
      .getNumbers()
        .then(initialPersons => {
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
          setNewMessage(`Added ${nameObject.name}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 3000)
        })
      }
    else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const numberToChange = persons.find(person => person.name === newName)
        const updatedNameObject = {
          name: newName,
          number: newNumber
        }
        numberService
          .updateNumber(numberToChange.id, updatedNameObject)
          .then(returnedNumber => {
            setPersons(persons.map(person => person.id !== numberToChange.id ? person : returnedNumber))
            setNewName('')
            setNewNumber('')
            setNewMessage(`Updated ${updatedNameObject.name}`)
            setTimeout(() => {
              setNewMessage(null)
            }, 3000)
          })
          .catch(error => {
            setNewMessage(`Information of ${updatedNameObject.name} has already been removed from the server`)
            setTimeout(() => {
              setNewMessage(null)
            }, 3000)
          })
      }
      else{
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      numberService
        .deleteNumber(person.id)
        setPersons(persons.filter(onePerson => onePerson.id !== person.id))
        setNewMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
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

      <Notification message={newMessage}/>

      <FilterForm handleFilterChange={handleFilterChange}
      newFilter={newFilter}/>

      <h3>add a new</h3>

      <NewPersonForm handleNumberChange={handleNumberChange}
      handleNameChange={handleNameChange}
      addNewPerson={addNewPerson}
      newName={newName}
      newNumber={newNumber}/>

      <h3>Numbers</h3>
      
      <PersonsRendered deletePerson={deletePerson} 
       persons={persons.filter(person => person.name.toUpperCase() !== newFilter.toUpperCase())}/>
    </div>
  )

}

export default App