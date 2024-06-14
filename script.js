let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");

let listProducts = [];
let listCart = [];

iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">
                    Dodaj u korpu
                </button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("addCart")){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

listCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("removeCart")) {
        let productIdToRemove = positionClick.parentElement.dataset.id;
        removeFromCart(productIdToRemove);
    }
});

const removeFromCart = (productIdToRemove) => {
    listCart = listCart.filter(item => item.product_id !== productIdToRemove);
    addCartToHTML();
};



const addToCart = (product_id) => {
    let positionThisProductInCart = listCart.findIndex((value) => value.product_id == product_id);
    if(listCart.length <= 0) {
        listCart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if(positionThisProductInCart < 0){
        listCart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        listCart[positionThisProductInCart].quantity = listCart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    if(listCart.length > 0){
        listCart.forEach(cart => {
            let product = listProducts.find(product => product.id == cart.product_id);
            let newCart = document.createElement("div");
            newCart.classList.add("item");
            newCart.innerHTML = `
                <div class="image">
                    <img src="${product.image}" alt="">
                </div>
                <div class="name">
                    ${product.name}
                </div>
                <div class="totalPrice">
                    $${product.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span>${cart.quantity}</span>
                </div>
                <button class="removeCart">Remove</button>
            `;
            newCart.dataset.id = product.id;
            listCartHTML.appendChild(newCart);
        });
    }
};


const initApp = () => {
    fetch("products.json")
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();
    });
};

initApp();