const filter = '?fields=name,capital,population,flags,languages';
export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}${filter}`).then(
    response => {
      return response.json();
    }
  );
}
