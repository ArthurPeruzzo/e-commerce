class Item {
    constructor(id, marca, preco, descontoPreco, quantidade, imagem) {
        this.id = id;
        this.marca = marca;
        this.preco = preco;
        this.descontoPreco = descontoPreco;
        this.quantidade = quantidade;
        this.imagem = imagem;
    }
  }

function displayImage(thumbnail) {
    var mainImage = document.getElementById("main-image");
    mainImage.src = thumbnail;
}

function adicionarNoCarrinho() {
    const itens = getItensCarrinho() || [];
    const item = new Item(1, "Samsung Galaxy", 999.99, 20.00, 1, "/imagens/galaxy2Grande.jpg")

    if (itens.some(item => item.id === item.id)) {
        alert("Item já adicionado no carrinho!")
    } else {
        itens.push(item);
        localStorage.setItem('cartItems', JSON.stringify(itens));
        alert("Item adicionado no carrinho!")
    }
}

function getItensCarrinho() {
    return JSON.parse(localStorage.getItem("cartItems"));
}