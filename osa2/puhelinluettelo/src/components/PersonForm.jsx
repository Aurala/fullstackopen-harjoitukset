// Component for the form for adding a new person to the phonebook

const PersonForm = ({ handlePersonChange, handleNumberChange, addPerson }) => {
  return (
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
  )
}

export default PersonForm
