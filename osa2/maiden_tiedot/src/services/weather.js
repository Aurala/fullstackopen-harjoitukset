import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1'

// Fetch all countries from the server
const getCity = (latitude, longitude) => {
  const params = {
    "latitude": latitude,
    "longitude": longitude,
    "current": "temperature_2m"
  };
  const request = axios.get(baseUrl + '/forecast', { params })

  console.log('Fetching weather data from server', latitude, longitude)

  return request.then(response => {
    console.log('Weather data received:', response.data)
    return response.data
  })
}

export default { getCity }
