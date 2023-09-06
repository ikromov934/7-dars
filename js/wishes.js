const elCards = findElement(".cards");

let products = JSON.parse(localStorage.getItem("favorites"))

renderProducts(products, elCards);

elCards.addEventListener("click", (evt) => {
    if (evt.target.matches("path")) {
        const id = Number(evt.target.dataset.id);

        products.forEach((product) => {
        
            if (product.id === id) {
                if (product.isFavorite) {
                    products = products.filter((element) => element.id !== id)
                }
                product.isFavorite = !product.isFavorite;
            }
        });
        renderProducts(products, elCards);
        localStorage.setItem("favorites",JSON.stringify(products))
    }

   
});

