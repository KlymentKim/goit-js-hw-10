const url = 'https://restcountries.com/v3.1/name';

export const fetchCountries = async (name) => {
  try {
    const response = await fetch(
      `${url}/${name}?fields=name,capital,population,flags,languages`)
        // `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    throw new Error(`HTTP error: ${error}`);
  }
};

