const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 3002
const getMovies = require('./movies.js')
const getWeather = require('./weather.js')





/* MIDDLEWARE */

app.use(cors());
app.use(express.static('public'))

/* API CALLS */








/* PATHS */

app.get('/', (req, res) => {
  res.status(200).render('./index.html')
})


app.get('/weather', async (req, res, next) => {

  try {
    const { lat, lon, ...rest } = req.query
    const weatherData = await getWeather(lat, lon)
    const dataArray = weatherData.data.data.map(day => {
      return new Forecast(day)
    });

    res.status(200).send(dataArray);
  } catch (error) {
    next(error);
  }
});


app.get('/movies', async (req, res, next) => {

  try {
    const movieData = await getMovies(req.query.city_name)
    const dataArray = movieData.data.results.map(movie => {
      return new MovieList(movie)
    });

    res.status(200).send(dataArray);
  } catch (error) {
    next(error);
  }
});




app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
});


/* Class for data parse */

class Forecast {
  constructor(cityData) {
    this.date = cityData.valid_date;
    this.description = `Low of ${cityData.low_temp}, high of ${cityData.high_temp} with ${cityData.weather.description}`;
  }
}

class MovieList {
  constructor(movieData) {
    this.title = movieData.title
    this.overview = movieData.overview
    this.votes = movieData.vote_count
    this.voteAvg = movieData.vote_average
    this.imgUrl = movieData.poster_path
    this.popularity = movieData.popularity
    this.released = movieData.release_date
    this.id = movieData.id
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