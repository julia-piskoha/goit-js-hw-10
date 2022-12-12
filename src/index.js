import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function fetchCountries({ name }) {
  return fetch('https://restcountries.com/v3.1/name/peru').then(response => {
    return response.json();
  });
}
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(e) {
  e.preventDefault();
  const onInput = e.target.value;
  fetchCountries(onInput)
    .then(renderCountries)
    .catch(error => {
      console.log(error);
    });
  // .finally(() => {
  //   refs.input.reset();
  // });
}

function renderCountries(countries) {
  const amountCountries = countries.length;
  const markupCountriesList = countries
    .map(
      country =>
        `<li class="country"><img src="${country.flags.svg}"
      alt="Flag of ${country.name.official}" width = 50px />
      <h1 class="title">${country.name.official}</h1></li>`
    )
    .join('');
  refs.countryList.innerHTML = markupCountriesList;
  if (amountCountries > 10) {
    Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (amountCountries === 1) {
    const countryInfoCard = countries
      .map(
        country =>
          `<p class="style_cards">Capital: ${country.capital}</p>
         <p class="style_cards">Population: ${country.population}</p>
         <p class="style_cards">Languages: ${Object.values(
           country.languages
         )}</p>`
      )
      .join('');
    refs.countryInfo.innerHTML = countryInfoCard;
  }
}

// let data = response.text();

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
