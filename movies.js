const axios = require('axios')

const getMovies = async (cityName) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`)
    if (response.status === 200) {
      return response
    }
  }
  catch (error) {

    console.log(error.code)
    const movieError = error
    console.log('log')
    return movieError
  }
}

exports.module = { getMovies }