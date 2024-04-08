import axios from 'axios';
import { IMDB_URL, IMDB_API_KEY } from './api/imdb-api';

axios.defaults.baseURL = IMDB_URL;

export async function fetchFilmDetailsById(id) {
  const query = `?api_key=${IMDB_API_KEY}`;

  const response = await axios(`/3/movie/${id}${query}`);

  return response.data;
}
