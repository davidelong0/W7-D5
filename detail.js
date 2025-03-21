const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjJiMjM4MzRiZjAwMTUwMDA2ZmQiLCJpYXQiOjE3NDI1NjIyOTgsImV4cCI6MTc0Mzc3MTg5OH0.OqvY_o8YgUSUwAxqmuzKfVV85u6ceLtxzGivwYQdr2I";

// Recupera l'ID del prodotto dalla query string nell'URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const container = document.getElementById("product-detail");

if (!productId) {
  container.innerHTML = "<p>⚠️ ID prodotto mancante</p>";
} else {
  // Recupera i dettagli del prodotto dall'API
  fetch(API_URL + productId, {
    headers: {
      Authorization: TOKEN, // Autorizzazione con Bearer Token
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Errore nel caricamento del prodotto: ${res.status}`);
      }
      return res.json();
    })
    .then((product) => {
      // Mostra i dettagli del prodotto
      container.innerHTML = `
        <div class="card">
          <img src="${product.imageUrl}" alt="${product.name}">
          <div class="card-body">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Prezzo: <strong>€${product.price}</strong></p>
            <p> Disponibili: <strong>${product.quantity || "N/A"}</strong></p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.error("Errore nel caricamento:", err);
      container.innerHTML = "<p>⚠️ Prodotto non trovato</p>";
    });
}

// Funzione per tornare alla homepage
function goHome() {
  window.location.href = "index.html"; // Riporta alla homepage
}
