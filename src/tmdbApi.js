import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGI1ODFhZmUzMmI0OWUzZmQxYTMxYTdjMjJiODEzYiIsInN1YiI6IjY2NWY1ODgzZWE5NDViNmEwZGJjMTFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rij-rhAN1D1GprRZHjJQxVIlO_fYWmXrp4LtmmbIT-U"
  },
  params: {
    page: 1,
    include_adult: false,
    language: "en-US"
  }
};

export async function getMovies() {
  const response = await axios.get(`3/trending/movie/day`, options);
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(`3/movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(`3/movie/${movieId}/credits`, options);
  return response.data.cast;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`3/movie/${movieId}/reviews`, options);
  return response.data.results;
}

export async function getMoviesByQuery(query) {
  const response = await axios.get(`3/search/movie?query=${query}`, options);
  return response.data;
}
