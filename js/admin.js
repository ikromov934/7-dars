import { findElement, renderProducts } from "./helpers.js";

const elCards = findElement(".cards");
let favoriteProducts = [];
let products = [];
const elForm = findElement("#form");
const elImage = findElement("#image");

const BASE_URL = "https://64f0b0178a8b66ecf77a03ee.mockapi.io";

fetch(BASE_URL + "/products")
    .then((res) => res.json())
    .then((res) => {
        // products = res;
        renderProducts(res, elCards, true);
        products = res;
    })
    .catch((err) => {
        alert(err);
    });

elCards.addEventListener("click", (evt) => {
    const target = evt.target;

    if (target.matches(".btn-info")) {
        const id = Number(target.dataset.id);
        const elTitle = findElement("#edit-title");
        const elPrice = findElement("#edit-price");

        products.forEach((product) => {
            if (product.id == id) {
                console.log(product);
                elTitle.value = product.title;
                elPrice.value = product.price;

                const elBtn = findElement("#save");

                elBtn.addEventListener("click", () => {
                    product.title = elTitle.value;
                    product.price = elPrice.value;

                    fetch(BASE_URL + "/products/" + id, {
                        method: "put",
                        body: JSON.stringify(product),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res);
                           
                        });
                });
            }
        });
    }
});

// post
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newProduct = JSON.stringify({
        title: evt.target.title.value,
        // description: evt.target.description.value,
        image: elImage.value,
        category: evt.target.category.value,
        price: evt.target.price.value,
        createdAt: new Date().getTime(),
    });

    fetch(BASE_URL + "/products/", {
        method: "POST",
        body: newProduct,
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        });
});
renderProducts(products, elCards, true);
