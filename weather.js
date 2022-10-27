const { getWeather } = require('./APICalls.js')
const { Forecast } = require('./Classes.js')


const getWeatherCallback = async (req, res, next) => {

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

exports.module = { getWeatherCallback }