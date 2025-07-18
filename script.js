// Sample products

const products = [
  {
    id: 1,
    name: "Headphones",
    price: 50,
    image: "images/wireless.jpeg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 80,
    image: "images/smartwatch.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "Speaker",
    price: 35,
    image: "images/speaker.png",
    quantity: 1,
  },
  {
    id: 4,
    name: "Charger",
    price: 15,
    image: "images/charger.png",
    quantity: 1,
  },
];

const container = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");

// Show products
function renderProducts() {
  container.innerHTML = ""; // Clear previous products
  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img id="img" src="${p.image}" alt="${p.name}" width="100%" />
      <h3>${p.name}</h3>
      <p>Price: $${p.price.toFixed(2)}</p>

      <div class="qty-controls">
        <button onclick="decreaseQty(${p.id})">-</button>
        <span id="qty-${p.id}">${p.quantity}</span>
        <button onclick="increaseQty(${p.id})">+</button>
      </div>

      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.appendChild(div);
  });
}

// Quantity control functions
function increaseQty(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    product.quantity++;
    document.getElementById(`qty-${id}`).innerText = product.quantity;
  }
}

function decreaseQty(id) {
  const product = products.find((p) => p.id === id);
  if (product && product.quantity > 1) {
    product.quantity--;
    document.getElementById(`qty-${id}`).innerText = product.quantity;
  }
}

// Add product to cart
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[id] = cart[id] ? cart[id] + product.quantity : product.quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  alert(`Added ${product.quantity} x ${product.name} to cart!`);
}

// Update cart count
function updateCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let total = Object.values(cart).reduce((a, b) => a + b, 0);
  cartCount.innerText = total;
}

// Initial render
renderProducts();
updateCount();

// check login

function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must log in first.");
    window.location.href = "login.html";
  } else {
    document.getElementById("usernameDisplay").innerText =
      "Hello, " + user.name;
  }
}

// logout 

function logoutUser() {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    window.location.href = "login.html";
  }