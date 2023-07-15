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


addToCart.addEventListener("submit",(e) => {
    e.preventDefault();
    socket.emit("addToCart",parseInt(productId.value))
})