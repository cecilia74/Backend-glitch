const socket = io();

const addProduct = document.getElementById("addProduct");
const titleProd = document.getElementById("titleProd");
const descProd = document.getElementById("descProd");
const catProd = document.getElementById("catProd");
const priceProd = document.getElementById("priceProd");
const codeProd = document.getElementById("codeProd");
const stockProd = document.getElementById("stockProd");
const url = document.getElementById("urlInput");

const deleteProduct = document.getElementById("deleteProduct");
const id = document.getElementById("productId");

socket.on("products", (productsList) => {
    const productListContainer = document.getElementById("dynamic-list");
    productListContainer.innerHTML = ""; 

    productsList.forEach((product) => {
        const productHTML = `
    <div class="col-md-3">
        <div class="card">
            <img class="card-img" src=${product.thumbnails} alt="" />
            <div class="card-body">
                <h2 class="card-title">${product.title}</h2>
                <p class="card-text">${product.description}</p>
                <p class="card-text">ID: ${product.id}</p>
                <p class="card-text">Code: ${product.code}</p>
                <p class="card-text">Stock: ${product.stock}</p>
                <p class="card-text">Price: $${product.price}</p>
                <p class="card-text">Category: ${product.category}</p>
                <p class="card-text">Status: ${product.status}</p>
            </div>
        </div>
    </div>`;

        productListContainer.insertAdjacentHTML("beforeend", productHTML);
    });
});

addProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit("new-product", {title: titleProd.value, description: descProd.value, price: parseInt(priceProd.value), thumbnails: url.value, code: codeProd.value, stock: parseInt(stockProd.value)});
    addProduct.reset();
        console.log(addProduct)
});

deleteProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("delete-product", parseInt(productId.value));
    deleteProduct.reset();

});
