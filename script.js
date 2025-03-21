const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjJiMjM4MzRiZjAwMTUwMDA2ZmQiLCJpYXQiOjE3NDI1NjIyOTgsImV4cCI6MTc0Mzc3MTg5OH0.OqvY_o8YgUSUwAxqmuzKfVV85u6ceLtxzGivwYQdr2I";

// Funzione per caricare i prodotti sulla homepage
const loadProducts = async () => {
  try {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    const response = await fetch(API_URL, {
      headers: {
        Authorization: TOKEN,
      },
    });

    if (response.ok) {
      const products = await response.json();
      products.forEach((product) => {
        // Controlla se la proprietà quantity esiste e ha un valore valido
        const availableQuantity =
          product.quantity !== undefined ? product.quantity : 0;

        container.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card product-card">
              <img src="${product.imageUrl}" class="card-img-top" alt="${
          product.name
        }">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>€${product.price.toFixed(
                  2
                )}</strong></p>
                <p class="card-text">Disponibili: ${availableQuantity}</p>
                <p class="card-text"><strong>ID Prodotto: ${
                  product._id
                }</strong></p>
                <button class="btn btn-primary" onclick="redirectToDetail('${
                  product._id
                }')">Dettagli</button>
                <button class="btn btn-success mt-2" onclick="addToCart('${
                  product._id
                }', '${product.name}', '${product.price}', '${
          product.imageUrl
        }', ${availableQuantity})">Aggiungi al Carrello</button>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      alert("Errore nel caricamento dei prodotti");
    }
  } catch (error) {
    console.error("Errore nel caricamento:", error);
  }
};

// Funzione per reindirizzare alla pagina dei dettagli
const redirectToDetail = (productId) => {
  window.location.href = `detail.html?id=${productId}`;
};

// Funzione di login per il backoffice
const login = (email, password) => {
  const correctEmail = "admin@esempio.com";
  const correctPassword = "password123";

  if (email === correctEmail && password === correctPassword) {
    window.location.href = "backoffice.html";
    alert("WELCOME MASTER");
  } else {
    alert(
      "Benvenuto nuovo allenatore! Se sei l'admin accedi con le credenziali predefinite"
    );
  }
};

// Ascolta il submit del form di login
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});

// Carica i prodotti quando la pagina è pronta
window.onload = loadProducts;

// Funzione per aggiungere il prodotto al carrello
function addToCart(id, name, price, imageUrl, availableQuantity) {
  if (availableQuantity === 0) {
    alert("Questo prodotto non è disponibile.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Aggiungi solo 1 prodotto per volta
  const productIndex = cart.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    cart.push({ id, name, price, imageUrl, quantity: 1 });
  } else {
    cart[productIndex].quantity = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Aggiunto al carrello!");
}

// Funzione per visualizzare il carrello
function viewCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContent = document.getElementById("cart-content");
  if (cart.length > 0) {
    cartContent.innerHTML = cart
      .map(
        (item) => `
      <p>${item.name} - €${item.price.toFixed(2)} x ${item.quantity}</p>
    `
      )
      .join("");
  } else {
    cartContent.innerHTML = "<p>Il carrello è vuoto.</p>";
  }
}

// Funzione per aggiornare il numero di articoli nel carrello
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}
