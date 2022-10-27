const { getMovies } = require('./APICalls.js')



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