import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YcPK50Q9Tlo6HTwuQdWD2bCxz3yagmtk1ZnwD5kwWM9YVWOHL7d5LNuEvzs7sfZj';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds')
    .then(response => {
      return response.data;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}