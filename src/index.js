import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './api/fetchCountries';

const DEBOUNCE_DELAY = 300;
const url = `https://restcountries.com/v3.1/name`;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(event) {
  event.preventDefault();
  const query = event.target.value.trim();

  if (!query) {
    clearResults();
    return;
  }

  fetch(`${url}${query}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(data => {

      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.');
        renderCountryInfo(data);
        clearResults();
        return;
      }
       if (data.length >= 2 && data.length <= 10) {
        renderCountryList(data);
        return;
      }

         // Перевірка наявності результатів пошуку
        if (data.length === 0) {
        renderCountryList(data);
        Notiflix.Notify.failure('Oops, there is no country with that name');
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
  // countryInfo.innerHTML = '';
  countryList.innerHTML = countries.map(country => `
    <li>
      <img src="${country.flags.svg}" alt="${country.name.official}" width="32" height="32">
      <span>${country.name.official}</span>
    </li>
  `).join('');

  countryList.addEventListener('click', onCountryListClick);
}

function onCountryListClick(event) {
  const target = event.target.closest('li');
  if (!target) return;

  const countryName = target.querySelector('span').textContent;

  fetch(`${url}${countryName}?fields=name.official,capital,population;flags,languages`)
    .then(response => response.json())
    .then(data => renderCountryInfo(data[0]))
    .catch(error => console.log(error));
}

function renderCountryInfo(country) {
    countryInfo.innerHTML = `
    <h2>${country.name.official}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <span class="country__span">${Object.values(languages).join(', ')}</span>
     <p>Languages: ${Object.values(languages).join(', ')}</p>
    <img src="${country.flags.svg}" alt="${country.name.official}" width="128px" height="128px"/>
    `
}