const { getMovies } = require('./APICalls.js');
const cache = require('./cache.js');
exports.cacheMovies = async (req, next) => {
  const fifteenMinute = 900000
  const hour = fifteenMinute * 4
  const day = hour * 24
  const week = day * 7
 
  const key = `movies-${req.query.city_name}`
  if (cache[key] && (Date.now() - cache[key].timestamp < week)) {
    console.log('Movie Cache hit');
  } else {
    console.log('Movie Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();

    try {
      const movieData = await getMovies(req.query.city_name)
      cache[key].data = movieData.data.results.map(movie => new MovieList(movie));


    } catch (error) {
      next(error);
    }
  }

  return cache[key].data
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