// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
    };



    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push(product); // Add new product to cart
    }

    updateCartUI();
    saveCartToLocalStorage();
}


// Function to remove a product from the cart
function removeFromCart(productId) {

    document.querySelector('.cart-items').addEventListener('click', event => {
        if (event.target.classList.contains("remove-btn")) {
            let productItem = event.target.closest('.product-item');
            productItem.remove();
        }
        updateCartUI();
        saveCartToLocalStorage();   

    });

    // cart = cart.filter((item) => item.id !== productId);
}

// Function to update the cart UI
function updateCartUI() {
    const cartItems = document.querySelector(".cart-items");
    const cartQuantity = document.querySelector(".cart-quantity");

    // Clear the cart items
    cartItems.innerHTML = "";

    // Add each product to the cart UI
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.innerHTML = `
             <div class="product-item">
                <div class="product-info">
                    <p class="product-name">${item.name}</p>
                    <p class="product-price">Rs. ${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update cart quantity
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartQuantity.textContent = totalQuantity;
}

// Function to update product quantity in the cart
function updateQuantity(productId, change) {
    const product = cart.find((item) => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId); // Remove if quantity is 0 or less
        } else {
            updateCartUI();
            saveCartToLocalStorage();
        }
    }
}

// Function to save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}



// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
        const productCard = event.target.closest(".product-card");
        const productId = productCard.getAttribute("data-id");
        const productName = productCard.getAttribute("data-name");
        const productPrice = productCard.getAttribute("data-price");

        addToCart(productId, productName, productPrice);

        alert(productName + " has been added to cart");
    });
});

// .
// .
// .
// .
// .
// .
// .
// .

// Function to calculate the total price
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to handle checkout
function checkOut() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some products before checking out.");
        return;
    }

    const total = calculateTotal();
    alert(`Total amount: Rs. ${total}\nThank you for your purchase!`);
    cart = []; // Clear the cart
    updateCartUI();
    saveCartToLocalStorage();
    closeCart();
}

// .
// .
// .
// .
// .
// .
// .
// .

// Local storage key for users
const USERS_KEY = "users";

// Function to get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// Function to save users to local storage
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Function to handle signup
function signupForm(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const users = getUsers();

    // Check if the user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        alert("User already exists. Please log in.");
        return;
    }

    // Add new user
    users.push({ username, email, password });
    saveUsers(users);
    alert("Signup successful! Please log in.");
    toggleForm(event);
}

// Function to handle login
function loginConfirm(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();

    // Check if the user exists
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        alert("Login successful!");
        window.location.href = "../index.html"; // Redirect to the main page
    } else {
        alert("Invalid email or password.");
    }
}