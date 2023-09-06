const elCards = findElement(".cards");
const elTemplate = findElement("#template").content;
const searchInput = findElement("#search-input");
const elSelect = findElement("#continents");
const loader = findElement("#loader");

const BASE_URL = "https://restcountries.com/v3.1/";

searchInput.addEventListener("input", () => {
    if (searchInput.value !== "") {
        // loader.style.display = "block";
        fetch(`${BASE_URL}name/${searchInput.value}`)
            .then((res) => res.json())
            .then((res) => {
                renderCountries(res);
                // loader.style.display = "none";
            });
    }
});

elSelect.addEventListener("change", (evt) => {
    if (elSelect.value === "All") {
        fetch(`${BASE_URL}all`)
            .then((res) => res.json())
            .then((res) => {
                renderCountries(res);
            });
    } else {
        fetch(`${BASE_URL}region/${elSelect.value}`)
            .then((res) => res.json())
            .then((res) => {
                renderCountries(res);
            });
    }
});

function renderCountries(array, parent = elCards) {
    parent.innerHTML = null;
    const fragment = document.createDocumentFragment();
    array.forEach((country) => {
        const newCard = elTemplate.cloneNode(true);
        const img = findElement(".card-img-top", newCard);
        const title = findElement(".card-title", newCard);
        img.src = country.flags.png;
        title.textContent = country.name.common;
        fragment.appendChild(newCard);
    });
    parent.appendChild(fragment);
}

fetch(`${BASE_URL}all`)
    .then((response) => response.json())
    .then((data) => {
        renderCountries(data, elCards);
    })
    .finally(() => {
        loader.style.display = "none";
    });


