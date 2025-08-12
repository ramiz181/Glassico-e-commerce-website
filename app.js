//........ Navbar fixing

window.addEventListener("scroll", function name() {

    let nav_fixed = document.getElementById('fixed-navbar')
    let Y_position = window.scrollY;
    let viewportHeight = window.innerHeight;

    if (Y_position > viewportHeight * 0.5) {
        nav_fixed.classList.add("nav-fixed");
    }
    else {
        nav_fixed.classList.remove("nav-fixed");
    }
})


//........ Cart panel hiding & showing

// let cartSection = document.getElementById('showcart');

var cartIcon = document.querySelector(".fa-bag-shopping");
var body = document.querySelector("body");
let cartSection = document.querySelector('.shopping-cart');

cartIcon.addEventListener('click', () => {
    // if (event.target.classList.contains("fa-bag-shopping")) {
    body.classList.add("showCart")
})

document.addEventListener('click', (event) => {
    // 
    if (!cartIcon.contains(event.target) &&
        !cartSection.contains(event.target) &&
        !event.target.classList.contains('remove-btn') ||
        event.target.classList.contains('close')) {
        body.classList.remove("showCart");
    }
})

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .


// ....... Product rendering

fetch('./products.json')
    .then(response => response.json())
    .then(dataJSON => {

        let productList = document.getElementById('get-product');
        dataJSON.forEach(product => {

            let productItem = document.createElement('div');

            productItem.classList.add('product-card');

            productItem.innerHTML = `
                    <div class="upper">
                        <img src="${product.image}" alt="${product.name}">
                        <i class="fa-regular fa-heart wishlist-icon"></i>
                        <div class="hidden-elements">
                            <i class="fas fa-eye" title="Preview"></i>
                            <i class="fas fa-exchange-alt" title="Compare Product"></i>
                        </div>
                        <button class="add-to-cart" data-id=${product.id}>Add to Cart</button>
                    </div>
                    <div class="lower">
                        <div class="product-name">${product.name}</div>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                        <div class="price">Rs. ${product.price}</div>
                    </div>
                `
            productList.appendChild(productItem)

            document.querySelectorAll('.add-to-cart').forEach(cartButton => {
                cartButton.addEventListener('click', addToCart);
            })
        })
    })

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

// Adding product to cart and calculate price 

let cartArr = JSON.parse(localStorage.getItem('cartItems')) || [];
let num = JSON.parse(localStorage.getItem('iconQuantity')) || 0;

// let quantityNum = 0;
function addToCart(event) {

    const targetBtn = event.target.dataset.id;
    fetch('products.json')
        .then(response => response.json())
        .then(dataJSON => {

            let product = dataJSON.find(p => p.id == targetBtn);
            // console.log(product);
            if (product) {
                const existingProduct = cartArr.find(item => item.id == targetBtn);
                if (existingProduct) {
                    existingProduct.quantity += 1;

                    // productAmount = existingProduct.price;
                    // totalAmount += productAmount;
                    // productAmount = 0;
                    calculateTotal(existingProduct.price, 0);
                }
                else {
                    // totalAmount += product.quantity;
                    product.quantity = 1;
                    cartArr.push(product);

                    // productAmount = product.price;
                    // totalAmount += productAmount;
                    // productAmount = 0;

                    calculateTotal(product.price, 0);
                }

                localStorage.setItem('cartItems', JSON.stringify(cartArr));
                alert(product.name + " added to cart");
            }
            pushToCartDisplay();


        })
}


// jub page refresh hoga to cart panel pr product load kry ga

document.addEventListener("DOMContentLoaded", () => {
    pushToCartDisplay();
    document.getElementById('cart-quantity').innerHTML = cartArr.length;
    document.getElementById('ottla').innerHTML = totalAmount;
    // calculateTotal();
    addToCart();
});

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

function pushToCartDisplay() {

    var cartItems = document.querySelector('.cart-items');
    cartArr = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.innerHTML = ""

    cartArr.forEach(item => {

        cartItems.innerHTML += `
                <div class="product-item" data-product-id="${item.id}">
                    <div class="product-info">
                        <h3 class="product-name">${item.name}</h3>
                        <p class="product-price"><strong>Rs. </strong>${item.price} × ${item.quantity}</p>
                    </div>
                    <button class="remove-btn" data-id="${item.id}" >Remove</button>
                </div>
            `;
    })

    document.querySelectorAll('.remove-btn').forEach(removeBtn => {
        removeBtn.addEventListener('click', removeProduct);
    })
    // < div class="quantity-controls" >
    //                 <button class="quantity-btn decrement" onclick="decrement('${item.id}')">-</button>
    //                 <span class="quantity" id="quantity-${item.id}">1</span>
    //                 <button class="quantity-btn increment" onclick="increment('${item.id}')">+</button>
    //             </div >
    // localStorage.setItem('cartItems', JSON.stringify(cartArr));

}

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
let totalAmount = JSON.parse(localStorage.getItem('totalAmountCart')) || 0;
// let productAmount;

function calculateTotal(productPrice, subAMount) {



    if (subAMount > 0) {
        totalAmount -= subAMount;
    }
    else {
        totalAmount += productPrice;
    }

    document.getElementById('cart-quantity').innerHTML = cartArr.length;
    document.getElementById('ottla').innerHTML = totalAmount;

    localStorage.setItem("totalAmountCart", JSON.stringify(totalAmount));
    // productAmount = productPrice;

    // productAmount = 0;

}

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .


function removeProduct(event) {

    cartArr = JSON.parse(localStorage.getItem('cartItems')) || [];
    // console.log(cartArr);

    let removeItem = event.target.dataset.id;
    let subAMount = 0;


    cartArr.find(item => {
        if (item.id == removeItem) {
            subAMount = item.price * item.quantity;
            // console.log("Item clicked = " + JSON.stringify(subAMount));
        }
    })

    let newArr = cartArr.filter((item) => {
        return item.id != removeItem
    });

    cartArr = newArr;

    localStorage.setItem("cartItems", JSON.stringify(cartArr))

    // console.log(newArr);

    calculateTotal(0, subAMount);
    pushToCartDisplay();

}

