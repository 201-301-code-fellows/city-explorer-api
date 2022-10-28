'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { getMoviesCallback } = require('./modules/movies.js')
const { getWeather } = require('./modules/weather.js');

app.use(cors());


app.get('/', (req, res) => {
  res.status(200).send('Server City Explorer API')
})

app.get('/movies', getMoviesCallback)

app.get('/weather', weatherHandler);

app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
});

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!')
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
