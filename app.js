const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const darkModeToggle = document.getElementById("dark-mode-toggle");

async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  localStorage.setItem("countries", JSON.stringify(countries));
  displayCountries(countries);
}

function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common}" class="country-flag">
      <h3>${country.name.common}</h3>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
    `;

    countryCard.addEventListener("click", () => {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      window.location.href = "country.html";
    });
    countriesContainer.appendChild(countryCard);
  });
}

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
  const filteredCountries = storedCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText)
  );
  displayCountries(filteredCountries);
});

regionFilter.addEventListener("change", () => {
  const selectedRegion = regionFilter.value;
  const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
  const filteredCountries =
    selectedRegion === "all"
      ? storedCountries
      : storedCountries.filter((country) => country.region === selectedRegion);
  displayCountries(filteredCountries);
});

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

window.addEventListener("load", () => {
  const storedCountries = JSON.parse(localStorage.getItem("countries"));
  if (storedCountries) {
    displayCountries(storedCountries);
  } else {
    fetchCountries();
  }
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});
