const { getMovies } = require('./APICalls.js');
const cache = require('./cache.js');
exports.cacheMovies = async (req, next) => {
  const key = `movies-${req.query.city_name}`

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
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