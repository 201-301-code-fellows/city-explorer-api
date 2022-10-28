const { cacheMovies } = require('./cacheMovies.js')



exports.getMoviesCallback = async (req, res, next) => {
  const dataFromCache = await cacheMovies(req, next)
  res.status(200).send(dataFromCache);
};
