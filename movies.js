const { getMovies } = require('./APICalls.js')
const { MovieList } = require('./Classes.js')


exports.getMoviesCallback = async (req, res, next) => {

  try {
    const movieData = await getMovies(req.query.city_name)
    const dataArray = movieData.data.results.map(movie => {
      return new MovieList(movie)
    });

    res.status(200).send(dataArray);
  } catch (error) {
    next(error);
  }
};


