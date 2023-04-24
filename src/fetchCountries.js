const url = 'https://restcountries.com/v3.1/name';

export async function fetchCountries(name) {
  return await fetch(
    `${url}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Data fail!');
    }
    return response.json();
  });
}
// async function fetchCountries(name) {
//   const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`);
//   const data = await response.json();
//   return data;
// }

// export { fetchCountries };


// function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`)
//     .then(response => response.json())
//     .then(data => data)
//     .catch(error => console.error(error));
// }

// export { fetchCountries };

   

// const fetchCountries = debounce(async (searchQuery, callback) => {
//   if (!searchQuery.trim()) 
//   return; // якщо поле пошуку пусте, повернути порожній масив
//   try {
//     // const response = await axios.get(`https://restcountries.com/v2/name/${searchQuery}`, {
//     const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`, {
//       params: {
//         fields: 'name,flags.svg,capital,population,languages' // вибір полів, що повертаються
//       }
//     });
//     callback(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }, 300);

// export default fetchCountries;