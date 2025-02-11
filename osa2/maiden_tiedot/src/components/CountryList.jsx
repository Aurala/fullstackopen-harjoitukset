const Flag = ({ country }) => {
  return (
    <div>
      <img src={country.flags.png} alt={country.name.common} width="200" />
    </div>
  )
}

const Country = ({ country }) => {
  console.log('Rendering country:', country)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>{`capital ${country.capital}`}</div>
      <div>{`population ${country.population}`}</div>
      <div>{`area ${country.area}`}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <Flag country={country} />
    </div>
  )
}

const CountryList = ({ countries, filter }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log('Matching countries:', filteredCountries.length)

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  } else {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    )
  }
}

export default CountryList
