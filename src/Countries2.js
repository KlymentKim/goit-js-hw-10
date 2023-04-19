import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', _.debounce(() => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm) {
    fetch(`https://restcountries.com/v2/name/${searchTerm}?fields=name.official,capital,population,flags.svg,languages`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countries.length > 1) {
          countryList.innerHTML = countries.map(country => `
            <li>
              <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" />
              <span>${country.name.official}</span>
            </li>
          `).join('');
          countryInfo.innerHTML = '';
        } else if (countries.length === 1) {
          const country = countries[0];
          countryList.innerHTML = '';
          countryInfo.innerHTML = `
            <h2>${country.name.official}</h2>
            <div>Capital: ${country.capital}</div>
            <div>Population: ${country.population}</div>
            <div>Languages: ${country.languages.map(lang => lang.name).join(', ')}</div>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" />
          `;
        } else {
          notiflix.Notify.info('Oops, there is no country with that name.');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        }
      })
      .catch(error => {
        notiflix.Notify.failure('Something went wrong. Please try again later.');
        console.error(error);
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}, 300));
