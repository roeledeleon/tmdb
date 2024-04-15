export const IMDB_API_KEY = `f4377cb887a6a7423eb708950289f0d1`;
export const IMDB_URL = `https://api.themoviedb.org`;

export const optionsIMDB = {
  specs: {
    trendingMovie: '/3/trending/movie/day',
    searchMovie: '/3/search/movie',
    movieDetails: `/3/movie/`,
    key: IMDB_API_KEY,
    baseURL: IMDB_URL,
    page: 1,
    query: '',
    totalPages: 1,
  },
};
