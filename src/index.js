import './css/styles.css';
import debounce from 'lodash.debounce';

// import { fetchCountries } from './fetchCountries';
// say.fetchCountries();
const DEBOUNCE_DELAY = 300;

// 

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const urlLink = `https://restcountries.com/v3.1/name/aruba?fullText=true${searchBox}`;
// const urlLink2 = `https://restcountries.com/v3.1/name/${searchBox}`;


searchBox.addEventListener('input', debounce(onSearchInput, 300));

function onSearchInput(event) {
  const query = event.target.value.trim();

  if (!query) {
    clearResults();
    return;
  }

  fetch(`${urlLink}${query}?fields=name.official;capital;population;flags.svg;languages`)
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
      <img src="${country.flags.svg}" alt="${country.name.official}" width="32px" height="20px">
      <span>${country.name.official}</span>
    </li>
  `).join('');

  countryList.addEventListener('click', onCountryListClick);
}

function onCountryListClick(event) {
  const target = event.target.closest('li');
  if (!target) return;

  const countryName = target.querySelector('span').textContent;

  fetch(`${urlLink}${countryName}?fields=name.official;capital;population;flags.svg;languages`)
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
    <p>Language: ${languages}</p>
    <img src="${country.flags.svg}" alt="${country.name.official}" width="128px" height="128px"/>
    `
}