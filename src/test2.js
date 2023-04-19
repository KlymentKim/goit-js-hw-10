const urlLink = 'https://restcountries.com/v3.1/all';
fetch(urlLink)
  .then(response => response.json())
  .catch(console.log);