import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {

  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  // Fetch data from the server
  useEffect(() => {
    console.log('Fetching data from server')
    phonebookService
      .getAll()
      .then(initialPersons => {
        console.log('Data fetched:', initialPersons)
        setPersons(initialPersons)
      })
  }, [])
  console.log('Persons:', persons)

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

  // Adds person to the phonebook if it doesn't exist already, sends to the server
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    const personObject = { name: newName, number: newNumber }
    if (!isExistingPerson(newName)) {
      console.log('Adding person:', personObject)
      phonebookService
        .create(personObject)
        .then(response => {
          console.log('Data sent:', personObject)
          console.log('Data received:', response)
          setPersons(persons.concat(response))
          setNewName('')
        })
    }
  }

  // Deletes person from the phonebook, after confirmation sends to the server
  const deletePerson = (id) => {
    console.log('Deleting person:', id)
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log('Confirmed deletion:', person)
      phonebookService
        .remove(id)
        .then(response => {
          console.log('Data sent:', id)
          console.log('Data received:', response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilter} />

      <h3>add a new</h3>
      <PersonForm handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />

    </div>
  )

}

export default App
