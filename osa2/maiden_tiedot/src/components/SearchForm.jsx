const SearchForm = ({ filter, handleFilterChange }) => {
  return (
    <form>
      Find countries: <input value={filter} onChange={handleFilterChange} />
    </form>
  )
}

export default SearchForm
