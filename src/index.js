import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// const urlLink = 'https://restcountries.com/v3.1/name/{name}';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// const fetchCountries = debounce(async (searchQuery, callback) => {
//   if (!searchQuery.trim()) 
//   return; // якщо поле пошуку пусте, повернути порожній масив
//   try {
//     // const response = await axios.get(`https://restcountries.com/v2/name/${searchQuery}`, {
//     const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`, {
//       params: {
//         fields: 'name,flags.svg,capital,population,languages.name' // вибір полів, що повертаються
//       }
//     });
//     callback(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }, 300);

// export default fetchCountries;


searchBox.addEventListener('input', debounce(onSearchInput, 300));

function onSearchInput(event) {
  const query = event.target.value.trim();

  if (!query) {
    clearResults();
    return;
  }

  fetch(`${BASE_URL}${query}?fields=name.official;capital;population;flags.svg;languages`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        clearResults();
        return;
      }

      if (data.length >= 2 && data.length <= 10) {
        renderCountryList(data);
        return;
      }

      if (data.length === 1) {
        renderCountryInfo(data[0]);
        return;
      }

      clearResults();
    })
    .catch(error => console.log(error));
}

function clearResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
  countryInfo.innerHTML = '';
  countryList.innerHTML = countries.map(country => `
    <li>
      <img src="${country.flags.svg}" alt="${country.name.official}" width="32" height="20">
      <span>${country.name.official}</span>
    </li>
  `).join('');

  countryList.addEventListener('click', onCountryListClick);
}

function onCountryListClick(event) {
  const target = event.target.closest('li');
  if (!target) return;

  const countryName = target.querySelector('span').textContent;

  fetch(`${BASE_URL}${countryName}?fields=name.official;capital;population;flags.svg;languages`)
    .then(response => response.json())
    .then(data => renderCountryInfo(data[0]))
    .catch(error => console.log(error));
}

function renderCountryInfo(country) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = `
    <h2>${country.name.official}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <img src="${country.flags.svg}" alt="${country.name.official}" width="128" height="128"/>`
}