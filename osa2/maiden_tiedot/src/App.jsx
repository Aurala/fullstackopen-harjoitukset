import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import CountryList from './components/CountryList'
import countriesService from './services/countries'

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  // Fetch data from the server
  useEffect(() => {
    console.log('Fetching country data from server')
    countriesService
      .getAll()
      .then(countriesData => {
        console.log('Country data fetched:', countriesData)
        setCountries(countriesData)
      })
  }, [])

  const handleFilter = (event) => {
    console.log("handleFilter:", event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <SearchForm filter={filter} handleFilterChange={handleFilter} />
      <CountryList countries={countries} filter={filter} />
    </div>
  )
}

export default App
