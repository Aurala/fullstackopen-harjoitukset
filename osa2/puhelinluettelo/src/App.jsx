import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  
  // Checks if person exists in the phonebook already, and alerts if so
  const isExistingPerson = (name) => {
    const exists = persons.some(person => person.name === name)
    console.log("isExistingPerson:", name, exists)
    if (exists) {alert(`${newName} is already added to the phonebook`)}
    return exists
  }

  // Event handler for name input
  const handlePersonChange = (event) => {
    console.log("handlePersonChange:", event.target.value)
    setNewName(event.target.value)
  }

  // Event handler for number input
  const handleNumberChange = (event) => {
    console.log("handleNumberChange:", event.target.value)
    setNewNumber(event.target.value)
  }

  // Event handler for filter input
  const handleFilter = (event) => {
    console.log("handleFilter:", event.target.value)
    setNewFilter(event.target.value)
  }

  // Adds person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    const personObject = { name: newName, number: newNumber }
    if (!isExistingPerson(newName)) {
      console.log('Adding person:', personObject)
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  // Fetch data from the server
  useEffect(() => {
    console.log('Fetching data from server')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Data fetched:', response.data)
        setPersons(response.data)
      })
  }, [])  
  console.log('Persons:', persons)

  return (
    <div>
      
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilter} />

      <h3>add a new</h3>
      <PersonForm handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />

    </div>
  )

}

export default App
