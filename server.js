const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
let weatherData = require('./data/weather.json')

const port = process.env.PORT || 3002






/* MIDDLEWARE */

app.use(cors());


/* PATHS */
app.get('/', (req, res, next) => {

  try {
    const cityName = req.query.city_name
    const dataToGroom = weatherData.find(city => city?.city_name === cityName);
    const dataObject = new Forecast(dataToGroom);
    const dataToSend = {
      lat: dataObject.lat,
      lon: dataObject.lon,
      data: dataObject
    }
    console.log(dataToSend)
    res.status(200).send(dataToSend);
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
    this.lat = cityData.lat
    this.lon = cityData.lon
  }
}


/* ERROR HANDLE */

app.use((e, req, res, next) => {
  res.status(500).send(`${req.query.city_name} was not found!
  ${e}`);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})