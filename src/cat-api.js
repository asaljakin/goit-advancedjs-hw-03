import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YcPK50Q9Tlo6HTwuQdWD2bCxz3yagmtk1ZnwD5kwWM9YVWOHL7d5LNuEvzs7sfZj';

export async function fetchBreeds() {
  return await axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export async function fetchCatByBreed(breedId) {
  return await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}