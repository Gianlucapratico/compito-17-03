async function createProduct(productData) {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2FlZWY4MWI0MjAwMTM5YjI4NDUiLCJpYXQiOjE2NzkwNDc0MDYsImV4cCI6MTY4MDI1NzAwNn0.TQ0uNt0mlCSq9HEEKq0YIbbR1Fa6moNkW6_9Gc6kDVc",
      },
      body: JSON.stringify(productData),
    }
  );
  const newProduct = await response.json();
  return newProduct;
}

async function getProducts() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2FlZWY4MWI0MjAwMTM5YjI4NDUiLCJpYXQiOjE2NzkwNDc0MDYsImV4cCI6MTY4MDI1NzAwNn0.TQ0uNt0mlCSq9HEEKq0YIbbR1Fa6moNkW6_9Gc6kDVc",
      },
    }
  );
  const products = await response.json();
  return products;
}
async function deleteProduct(productId) {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2FlZWY4MWI0MjAwMTM5YjI4NDUiLCJpYXQiOjE2NzkwNDc0MDYsImV4cCI6MTY4MDI1NzAwNn0.TQ0uNt0mlCSq9HEEKq0YIbbR1Fa6moNkW6_9Gc6kDVc",
      },
    }
  );
  return response.ok;
}
async function modifyProduct(productId, productData) {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2FlZWY4MWI0MjAwMTM5YjI4NDUiLCJpYXQiOjE2NzkwNDc0MDYsImV4cCI6MTY4MDI1NzAwNn0.TQ0uNt0mlCSq9HEEKq0YIbbR1Fa6moNkW6_9Gc6kDVc",
      },
      body: JSON.stringify(productData),
    }
  );
  const modifiedProduct = await response.json();
  return modifiedProduct;
}

// Funzione per modificare il prodotto
async function modifyproduct(productId) {
  // Ottenere i dati dal form HTML per aggiornare il prodotto
  const updatedName = document.getElementById("name").value;
  const updatedDescription = document.getElementById("description").value;
  const updatedBrand = document.getElementById("brand").value;
  const updatedPrice = document.getElementById("price").value;
  const updatedImageURL = document.getElementById("imageUrl").value;

  // Creare un oggetto contenente i dati aggiornati
  const updatedProduct = {
    name: updatedName,
    description: updatedDescription,
    brand: updatedBrand,
    price: updatedPrice,
    imageUrl: updatedImageURL,
  };

  try {
    // Modificare il prodotto con l'API
    const modifiedProduct = await modifyProduct(productId, updatedProduct);
    console.log("Prodotto modificato:", modifiedProduct);

    // Aggiornare la lista dei prodotti nella pagina
    document.getElementById("product-list").innerHTML = "";
    await renderProductList();
  } catch (error) {
    console.error(error);
  }
}

async function renderProductList() {
  const productList = await getProducts();
  const productListElement = document.getElementById("product-list");
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    const productCard = `
        <div class="col-12 col-md-6 col-lg-3 mb-3">
          <div class="card">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Brand: ${product.brand}</p>
              <p class="card-text">Price: $${product.price}</p>
              <button class="btn btn-warning" onclick="modifyproduct('${product._id}')"> Modifica</button>
              <button class="btn btn-danger" onclick="deleteProduct('${product._id}')"> Cancella</button>
            </div>
          </div>
        </div>
      `;
    productListElement.insertAdjacentHTML("beforeend", productCard);
  }
}
