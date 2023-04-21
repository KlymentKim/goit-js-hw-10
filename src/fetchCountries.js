

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

// fetchCountries.js
// export const fetchCountries = async (name) => {
//   try {
//     const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name;capital;population;flags.svg;languages`);
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     const countries = await response.json();
//     return countries;
//   } catch (error) {
//     throw new Error(`HTTP error: ${error}`);
//   }
// };


// async function fetchCountries(name) {
//   const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags.svg,languages`);
//   const data = await response.json();
//   return data;
// }

// export { fetchCountries };

// export const fetchCountries = name => {
//   return fetch(
//     `https://restcountries.com/v2/name/${name}?fields=name;capital;population;flags.svg;languages`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error(response.statusText);
//   });
// };
