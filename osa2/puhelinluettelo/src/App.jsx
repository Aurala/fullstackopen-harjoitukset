import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {

  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState([])

  // Fetch data from the server
  useEffect(() => {
    console.log('Fetching data from server')
    phonebookService
      .getAll()
      .then(initialPersons => {
        console.log('Data fetched:', initialPersons)
        setPersons(initialPersons)
        showNotification('Phonebook downloaded from server', 1, false)
      })
  }, [])
  console.log('Persons:', persons)

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

  // Adds person to the phonebook, sends to the server
  // If person already exists, after confirmation updates the number
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    const personObject = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      console.log('Person already exists:', existingPerson)
      updatePerson(existingPerson.id)
    } else {
      console.log('Adding person:', personObject)
      phonebookService
        .create(personObject)
        .then(response => {
          console.log('Data sent:', personObject)
          console.log('Data received:', response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`, 5, false)
        }).catch(error => {
          const errorMessage = error.response?.data?.error || 'An unexpected error occurred'
          console.log(`Error adding ${newName}:`, errorMessage)
          showNotification(errorMessage, 5, true)
        })
    }
  }

  // Updates person's number in the phonebook, after confirmation sends to the server
  const updatePerson = (id) => {
    console.log('Updating person:', id)
    const person = persons.find(person => person.id === id)
    const changedPerson = { ...person, number: newNumber }

    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      console.log('Confirmed update:', changedPerson)
      phonebookService
        .update(id, changedPerson)
        .then(response => {
          console.log('Data sent:', changedPerson)
          console.log('Data received:', response)
          setPersons(persons.map(person => person.id !== id ? person : response))
          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${person.name}`, 5, false)
        })
        .catch(error => {
          console.log('Error updating:', error)
          showNotification(`Information of ${person.name} has already been removed from the server.`, 5, true)
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
          showNotification(`Deleted ${person.name}`, 5, false)
        })
        .catch(error => {
          console.log('Error deleting:', error)
          showNotification(`Information of ${person.name} has already been removed from the server.`, 5, true)
        })
    }
  }

  // Shows notification for a specified amount of time
  // If error is true, shows error message
  const showNotification = (message, seconds, error) => {
    const emptyNotificationObject = { message: '', error: false }
    const notificationObject = { message: message, error: error }
    
    console.log('Notification:', notificationObject)
    setNotification(notificationObject)
    setTimeout(() => {
      setNotification(emptyNotificationObject)
    }, seconds * 1000)
  }

  return (
    <div>
      
      <Notification notification={notification} />

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
