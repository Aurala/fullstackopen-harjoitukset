// Component for displaying the persons in the phonebook

const Entry = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => <Entry key={person.name} person={person} />)}
    </div>
  )
}

export default Persons
