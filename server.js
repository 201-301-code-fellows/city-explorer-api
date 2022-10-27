const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 3002
const { getMoviesCallback } = require('./movies.js')
const { getWeatherCallback } = require('./weather.js')





/* MIDDLEWARE */

app.use(cors());
app.use(express.static('public'))

/* API CALLS */


/* PATHS */

app.get('/', (req, res) => {
  res.status(200).render('./index.html')
})


app.get('/weather', () => getWeatherCallback())


app.get('/movies', () => getMoviesCallback())



app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
});





/* ERROR HANDLE */

app.use((e, req, res, next) => {
  console.log(e.message)
  res.status(500).send(`${req.query.city_name} was not found!
  ${e}`);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})