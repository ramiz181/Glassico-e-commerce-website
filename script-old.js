var data = [];

var signup = [12];
var login = [];

var cart = [];

var inputID1 = ["username", "signup-email", "signup-password"];
var inputID2 = ["email", "password"];


function signupForm(event) {
    event.preventDefault();
    for (let i = 0; i < inputID1.length; i++) {
        signup[i] = document.getElementById(inputID1[i]).value;
    }

    console.log(signup);
}

function loginConfirm(event) {
    event.preventDefault();

    for (let j = 0; j < inputID2.length; j++) {

        login[j] = document.getElementById(inputID2[j]).value;

    }

    for (let k = 0; k < 2; k++) {

        if (login[k] === signup[k + 1]) {

            // alert("redirecting to homepage");
            window.location.replace(".\..\index.html");

        }
        else {

            alert("Invalid email or password");

        }

    }
}

function toggleForm(event) {
    event.preventDefault();
    var loginContainer = document.getElementById('login-container');
    var signupContainer = document.getElementById('signup-container');

    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    }
}


// Add to cart functionality

document.querySelector(".product-content").addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        if (signup.length == 0) {

            window.location.href = "login/index.html";

        }

        var productParent = event.target.closest('.get-product-data');
        var productID = productParent.dataset.id;
        var productName = productParent.dataset.name;
        var productPrice = productParent.dataset.price;


        var existingProduct = cart.find(item => item.cartID === productID);

        if (existingProduct) {

            var quantityElement = document.getElementById(`quantity-${productID}`);
            var currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity + 1;
        }

        else {

            var cartObj = {
                cartID: productID,
                cartName: productName,
                cartPrice: productPrice,
                // cartQuantity: productQuantity,
            }

            var cartItems = document.querySelector('.cart-items');

            // var createElement = document.createElement('div');

            // createElement.classList.add('item');

            // JSON.stringify(cartObj);



            cart.push(cartObj);

            cartItems.innerHTML += `
            <div class="product-item" data-product-id="${productID}">
                <div class="product-info">
                    <h3 class="product-name">${productName}</h3>
                    <p class="product-price">${productPrice} × ${currentQuantity}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrement" onclick="decrement('${productID}')">-</button>
                    <span class="quantity" id="quantity-${productID}">1</span>
                    <button class="quantity-btn increment" onclick="increment('${productID}')">+</button>
                </div>
                <button class="remove-btn">Remove</button>
            </div>
        `;


            // createElement.innerHTML += `<h3> ${productID} </h3>
            // <h3>${productName}</h3>
            // <h3> ${productPrice}</h3>`


            // cartItems.appendChild(createElement);


        }
    }
})


function increment(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
}

function decrement(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity -= 1;
        quantityElement.textContent = quantity;
    }
}

// var quantity = 1;

// function increment(event) {

//     quantity++;

//     document.getElementById('testing').innerHTML;
//     event.target.('#testing').innerHTML;

//     // incrementBtn = quantity;
//     // console.log(incrementBtn);

// }
// function decrement() {
//     if (quantity > 1) {
//         quantity--;
//         document.getElementById('testing').innerHTML = quantity;
//         // incrementBtn = quantity;
//     }

//     // console.log(incrementBtn);
// }



// cart product remove

document.querySelector('.cart-items').addEventListener('click', event => {
    if (event.target.classList.contains("remove-btn")) {
        let productItem = event.target.closest('.product-item');
        productItem.remove();
    }
});


// document.querySelectorAll('.remove-btn').forEach(button => {
//     button.addEventListener('click', function () {
//     });
// });



// showing cart

var cartIcon = document.querySelector(".fa-bag-shopping");

var body = document.querySelector("body");

function cartToggle() {
    body.classList.toggle("showCart")
}

function closeCart() {
    body.classList.remove("showCart")
}


function checkOut() {

    // if (login.length != 0) {
    alert("Successfully checkout, Thanks for coming");
    window.location.replace("\index.html");
    // }
    // else {
    //     alert("Login required");
    // }

}