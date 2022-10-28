const cacheMovies = require('./cacheMovies.js')



exports.getMoviesCallback = (req, res, next) => {
  const dataFromCache = cacheMovies(req, next)
  res.status(200).send(dataFromCache);
 
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