const axios = require('axios')
require('dotenv').config


exports.getMovies = async (cityName) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`)
    if (response.status === 200) {
      return response
    }
  }
  catch (error) {
    const movieError = error
    return movieError
  }
}

/* Weather API call for myweather.js */
// exports.getWeather = async (latitude, longitude) => {
//   try {
//     const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`)
//     if (response.status === 200) {

//       return response
//     }

//   }

//   catch (error) {

//     console.log(error.code)
//     const weatherError = error

//     return weatherError
//   }
// }

