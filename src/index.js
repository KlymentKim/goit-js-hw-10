import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// const urlLink = 'https://restcountries.com/v3.1/name/{name}';

const input = document.getElementById('search-box');
const ul = document.querySelector('country-list');

const fetchCountries = debounce(async (searchQuery, callback) => {
  if (!searchQuery.trim()) 
  return; // якщо поле пошуку пусте, повернути порожній масив
  try {
    // const response = await axios.get(`https://restcountries.com/v2/name/${searchQuery}`, {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`, {
      params: {
        fields: 'name,flags.svg,capital,population,languages.name' // вибір полів, що повертаються
      }
    });
    callback(response.data);
  } catch (error) {
    console.log(error);
  }
}, 300);

export default fetchCountries;