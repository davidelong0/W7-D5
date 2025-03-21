const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjJiMjM4MzRiZjAwMTUwMDA2ZmQiLCJpYXQiOjE3NDI1NjIyOTgsImV4cCI6MTc0Mzc3MTg5OH0.OqvY_o8YgUSUwAxqmuzKfVV85u6ceLtxzGivwYQdr2I";

// Funzione per aggiungere il prodotto
const addProduct = async () => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;

  // Controlla che tutti i campi siano validi
  if (
    !name ||
    !description ||
    isNaN(price) ||
    isNaN(quantity) ||
    !brand ||
    !imageUrl
  ) {
    alert("Tutti i campi devono essere compilati correttamente.");
    return;
  }

  // Verifica che price e quantity siano numeri validi
  if (price <= 0 || quantity < 0) {
    alert(
      "Il prezzo e la quantità devono essere numeri validi (prezzo > 0 e quantità >= 0)."
    );
    return;
  }

  const productData = {
    name,
    description,
    price,
    quantity,
    brand,
    imageUrl,
  };

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
      }
    );

    if (response.ok) {
      const newProduct = await response.json();
      console.log("Prodotto aggiunto:", newProduct);
      alert("Prodotto aggiunto!");
      localStorage.setItem("productsUpdated", "true");
      document.getElementById("add-product-form").reset(); // Reset form
      window.location.href = "index.html"; // Ricarica la homepage
    } else {
      const errorData = await response.json();
      console.error("Errore nel caricamento del prodotto:", errorData);
      alert(
        `Errore nell'aggiunta del prodotto: ${
          errorData.message || "Errore sconosciuto"
        }`
      );
    }
  } catch (error) {
    console.error("Errore nel processo:", error);
    alert("Errore nel processo di aggiunta prodotto!");
  }
};

// Funzione per rimuovere un prodotto tramite ID
const removeProduct = async () => {
  const productId = document.getElementById("product-id").value;

  if (!productId) {
    alert("Inserisci un ID prodotto valido.");
    return;
  }

  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: TOKEN,
        },
      }
    );

    if (response.ok) {
      alert("Prodotto rimosso!");
      window.location.href = "index.html";
    } else {
      alert("Errore nella rimozione del prodotto.");
    }
  } catch (error) {
    console.error("Errore nel processo di rimozione:", error);
    alert("Errore nella rimozione del prodotto.");
  }
};

// Funzione per rimuovere tutti i prodotti
const removeAllProducts = async () => {
  const confirmation = confirm(
    "Sei sicuro di voler rimuovere tutti i prodotti?"
  );
  if (!confirmation) return;

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "DELETE",
        headers: {
          Authorization: TOKEN,
        },
      }
    );

    if (response.ok) {
      alert("Tutti i prodotti sono stati rimossi!");
      window.location.href = "index.html";
    } else {
      alert("Errore nella rimozione dei prodotti.");
    }
  } catch (error) {
    console.error("Errore nel processo di rimozione:", error);
    alert("Errore nella rimozione dei prodotti.");
  }
};

document.getElementById("add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});
