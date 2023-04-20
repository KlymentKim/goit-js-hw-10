// index.js
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchInput = document.querySelector('#search-input');
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
  const languages = country.languages.map((language) => language.name).join(', ');
  countryInfo.innerHTML = `
    <h2>${country.name.official}</h2>
    <div class="country-info-details">
      <div>
        <p>Capital:</p>
        <p>${country.capital || '-'}</p>
      </div>
      <div>
        <p>Population:</p>
        <p>${country.population || '-'}</p>
        </div>
        <p>Language:</p>
        <p>${languages || '-'}</p>
        </div>
        `;
        
}
