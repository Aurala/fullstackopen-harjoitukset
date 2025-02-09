import { useState } from 'react'

const Entry = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  
  const isExistingPerson = (name) => {
    const exists = persons.some(person => person.name === name)
    console.log("isExistingPerson:", name, exists)
    if (exists) {alert(`${newName} is already added to the phonebook`)}
    return exists
  }

  const handlePersonChange = (event) => {
    console.log("handlePersonChange:", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("handleNumberChange:", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log("handleFilter:", event.target.value)
    setNewFilter(event.target.value)
  }

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

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input onChange={handleFilter} />
        </div>
      </form>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input onChange={handlePersonChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {filteredPersons.map(person => <Entry key={person.name} person={person} />)}
    </div>
  )

}

export default App
