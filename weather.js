const axios = require('axios');

const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`)
    if (response.status === 200) {

      return response
    }

  }

  catch (error) {

    console.log(error.code)
    const weatherError = error

    return weatherError
  }
}

exports.module = { getWeather }