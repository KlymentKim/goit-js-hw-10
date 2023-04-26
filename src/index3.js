import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(handleSearchInput, 300));

async function handleSearchInput(event) {
  const searchQuery = event.target.value.trim();
  if (searchQuery === '') {
    clearSearchResults();
    return;
  }
  try {
    const countries = await fetchCountries(searchQuery);
    if (countries.length === 0) {
      clearSearchResults();
      return;
    }
    if (countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }
    renderCountryList(countries);
  } catch (error) {
    Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
  }
}

function clearSearchResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
  countryList.innerHTML = '';
  countries.forEach((country) => {
    const countryItem = document.createElement('div');
    countryItem.classList.add('country-item');
    const flagImg = document.createElement('img');
    flagImg.src = country.flags.svg;
    flagImg.alt = `${country.name.official} flag`;
    flagImg.classList.add('country-flag');
    const countryName = document.createElement('p');
    countryName.textContent = country.name.official;
    countryItem.append(flagImg, countryName);
    countryList.appendChild(countryItem);
    countryItem.addEventListener('click', () => {
      renderCountryInfo(country);
    });
  });
}

function renderCountryInfo(country) {
   // const languages = country.languages.map((language) => language.name).join(', ');
   countryInfo.innerHTML = `
    <h2>${country.name.official}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <span class="country__span">${Object.values(languages).join(', ')}</span>
     <p>Languages: ${Object.values(languages).join(', ')}</p>
    <img src="${country.flags.svg}" alt="${country.name.official}" width="128px" height="128px"/>
    `
    
    
}
