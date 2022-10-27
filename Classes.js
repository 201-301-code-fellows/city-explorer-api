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


exports.module = { Forecast, MovieList }