// Component for displaying the persons in the phonebook

const Entry = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      &nbsp;
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, filter, deletePerson }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => (
          <Entry key={person.name} person={person} deletePerson={deletePerson} />
      )
      )}
    </div>
  )
}

export default Persons
