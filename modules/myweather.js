const { getWeather } = require('./APICalls.js')



exports.getWeatherCallback = async (req, res, next) => {

  try {
    const { lat, lon } = req.query
    const weatherData = await getWeather(lat, lon)
    const dataArray = weatherData.data.data.map(day => {
      return new Forecast(day)
    });

    res.status(200).send(dataArray);
  } catch (error) {
    next(error);
  }
};


class Forecast {
  constructor(cityData) {
    this.date = cityData.valid_date;
    this.description = `Low of ${cityData.low_temp}, high of ${cityData.high_temp} with ${cityData.weather.description}`;
  }
}
