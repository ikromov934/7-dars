const test = "test";

export default test;


export function findElement(element, parent = document) {
    return parent.querySelector(element);
}



export const templateProducts = findElement("#template-products");
export function renderProducts(products, parent, isAdmin) {
    parent.innerHTML = null;
    const fragment = document.createDocumentFragment();
     products.forEach((element) => {
        const newTemplate = templateProducts.content.cloneNode(true);
        const img = findElement(".card-img-top",newTemplate);
        const title = findElement(".card-title",newTemplate);
        const rate = findElement(".card-rate",newTemplate);
        const count = findElement(".card-count",newTemplate);
        const price = findElement(".card-price",newTemplate);
        const likePath1 = findElement(".like-path1",newTemplate);
        const likePath2 = newTemplate.querySelector(".like-path2");
        const elLink = findElement("#link",newTemplate);


        if(elLink){
            elLink.href = `http://127.0.0.1:5500/pages/single.html?id=${element.id}`
        }

        if(isAdmin){
             const editBtn  =  findElement(".btn-info", newTemplate);
             editBtn.dataset.id = element.id
        }
       
    
        
        likePath1.dataset.id  = element.id
        likePath2.dataset.id  = element.id

        img.src = element.image;
        title.textContent = element.title;
        
        price.textContent = element.price + "$";
       
        fragment.appendChild(newTemplate);
    });

    parent.appendChild(fragment)

}
