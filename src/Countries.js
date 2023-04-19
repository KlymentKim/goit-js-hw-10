// Підключення бібліотек
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// Отримання елементів DOM
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


// Функція для виконання HTTP-запиту до API Rest Countries
const searchCountry = (name) => {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags.svg,languages`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
      } else if (data.length > 1) {
        renderCountryList(data);
      } else if (data.length === 1) {
        renderCountryInfo(data[0]);
      } else {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        Notiflix.Notify.failure('Something went wrong. Please try again later.');
      }
    });
};

// Функція для відображення списку країн
const renderCountryList = (countries) => {
    countryList.innerHTML = '';
    countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}" /><span>${country.name.official}</span>`;
        listItem.addEventListener('click',)
    })
}
