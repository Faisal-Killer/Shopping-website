const cartDiv = document.getElementById("cart-items");
const qtyDisplay = document.getElementById("total-qty");
const priceDisplay = document.getElementById("total-price");

const products = [
  { id: 1, name: "Headphones", price: 50 },
  { id: 2, name: "Smart Watch", price: 80 },
  { id: 3, name: "Speaker", price: 35 },
  { id: 4, name: "Charger", price: 15 },
];

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cartDiv.innerHTML = "";
  let totalQty = 0;
  let totalPrice = 0;

  for (let id in cart) {
    const product = products.find((p) => p.id == id);
    const qty = cart[id];

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <p>
        <button onclick="changeQty(${product.id}, -1)">-</button>
        ${qty}
        <button onclick="changeQty(${product.id}, 1)">+</button>
      </p>
    `;

    cartDiv.appendChild(item);

    totalQty += qty;
    totalPrice += qty * product.price;
  }

  qtyDisplay.innerText = totalQty;
  priceDisplay.innerText = totalPrice.toFixed(2);
}

function changeQty(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[id] = (cart[id] || 0) + change;
  if (cart[id] <= 0) delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();

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
