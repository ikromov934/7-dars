import  {findElement,renderProducts} from "./helpers.js"
import { BASE_URL } from "./utils.js";

const elCards = findElement(".cards");
let favoriteProducts = [];
let products = [];


fetch(BASE_URL +"/products")
    .then((res) => res.json())
    .then((res) => {
        // products = res;
        renderProducts(res, elCards);
       
    })
    .catch((err) => {
        alert(err);
    });

renderProducts(products, elCards);
