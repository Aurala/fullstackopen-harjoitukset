import React, { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('Fetching weather:', country)
      const latitude = country.capitalInfo.latlng[0]
      const longitude = country.capitalInfo.latlng[1]
      console.log('Capital coords:', latitude, longitude)
      try {
        const weatherData = await weatherService.getCity(latitude, longitude)
        setWeather(weatherData)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeather()
  }, [country])

  if (!weather) { 
    return <div>Loading weather...</div>
  }

  return (
    <div>
      Temperature: {weather.current.temperature_2m} {weather.current_units.temperature_2m}
    </div>
  )
}

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
      <div>{`Capital: ${country.capital}`}</div>
      <div>{`Population: ${country.population}`}</div>
      <div>{`Area: ${country.area}`}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <Flag country={country} />
      <h3>{`Weather in ${country.capital}`}</h3>
      <Weather country={country} />
    </div>
  )
}

const CountryList = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const handleShowCountry = (countryName) => {
    console.log('Show country:', countryName)
    setFilter(countryName)
  }

  console.log('Matching countries:', filteredCountries.length)

  if (filteredCountries.length > 10) {
    console.log('Too many matches')
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length === 1) {
    console.log('Show country:', filteredCountries[0].name.common)
    return (
      <Country country={filteredCountries[0]} />
    )
  } else {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.name.common}>
            {country.name.common}
            &nbsp;
            <button onClick={() => handleShowCountry(country.name.common)}>show</button>
          </div>
        ))}
      </div>
    )
  }
}

export default CountryList
