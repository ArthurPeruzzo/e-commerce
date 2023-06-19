function displayImage(thumbnail) {
    var mainImage = document.getElementById("main-image");
    mainImage.src = thumbnail;
}

function adicionarNoCarrinho() {
    const itens = getItensCarrinho() || [];
    const produto = new Produto(1, "Samsung Galaxy", 999.99, 20.00, 1, "/imagens/galaxy2Grande.jpg")
    itens.find(produto)
    alert("Produto adicionado ao carrinho!");
}

function getItensCarrinho() {
    return JSON.parse(localStorage.getItem("cartItems"));
}