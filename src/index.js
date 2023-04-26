import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleSearchInput, 300));

async function handleSearchInput(event) {
    event.preventDefault();

  const searchQuery = event.target.value.trim();
  if (!searchQuery) {
    clearSearchResults();
    return;
  }
  
    fetchCountries(searchQuery)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
       
            } else if (countries.length >= 2 && countries.length <= 10) {
                clearSearchResults();
                renderCountryList(countries);
            } else {
                clearSearchResults();
                renderCountryInfo(countries);
               }
             
        })
        .catch(() => {
        clearSearchResults();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
}

function renderCountryList(dataCountry) {
  const markup = dataCountry
    .map(({ name, flags }) => {
      return `<li class="country-list__item">
        <img class="country-list__img" src="${flags.svg}" alt="flag" 
         width="96" height="96" />
        <p class="country-list__text">${name.official}</p>
      </li>`;
    }).join('');
    
  return countryList.insertAdjacentHTML('beforeend', markup);
}

function renderCountryInfo(dataCountry) {
    const markup = dataCountry
        .reduce((acc, { name, capital, population, flags, languages }) => {
            return acc + `
       <img class="country__img" src="${flags.svg}" alt="flag width="96" height="96">
        <p class="country__name"><h2>${name.official}</h2></p>
        <ul class="country__info">
            <li class="country__item"> <b>Capital: </b>:
            <span class="country__span">${capital}</span>
            </li>
            <li class="country__item"> <b>Population: </b>:
            <span class="country__span">${population}</span>
            </li>
            <li class="country__item"> <b>Languages: </b>:
            <span class="country__span">${Object.values(languages).join(', ')}</span>
            </li>
        </ul>`;
        }, '');
return countryInfo.insertAdjacentHTML('beforeend', markup);
}
function clearSearchResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
