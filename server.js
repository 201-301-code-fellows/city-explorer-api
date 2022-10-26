const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');
const port = process.env.PORT || 3002






/* MIDDLEWARE */

app.use(cors());
app.use(express.static('public'))

/* API CALLS */
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






/* PATHS */

app.get('/', (req, res) => {
  res.status(200).render('./index.html')
})


app.get('/weather', async (req, res, next) => {

  try {
    const { lat, lon, ...rest } = req.query
    const weatherData = await getWeather(lat, lon)
    console.log(weatherData.data.data)
    const dataArray = weatherData.data.data.map(day => {
      return new Forecast(day)
    });

    res.status(200).send(dataArray);
  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
  }
});




app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
});


class Forecast {
  constructor(cityData) {
    this.date = cityData.valid_date;
    this.description = `Low of ${cityData.low_temp}, high of ${cityData.high_temp} with ${cityData.weather.description}`;
  }
}


/* ERROR HANDLE */

app.use((e, req, res, next) => {
  console.log(e.message)
  res.status(500).send(`${req.query.city_name} was not found!
  ${e}`);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})