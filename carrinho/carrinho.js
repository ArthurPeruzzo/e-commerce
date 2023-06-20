
function atualizaQuantidadeItensNoCarrinho() {
    const cartCountElem = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCountElem.innerText = cartItems.length.toString();
  }
  
  function mostraItens() {
    const cartItemsElem = document.getElementById('cart-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    cartItemsElem.innerHTML = '';
  
    cartItems.forEach((item, index) => {
      const productElem = document.createElement('div');
      productElem.classList.add('product');
      productElem.innerHTML = `
        <img src="${item.imagem}" alt="${item.marca}">
        <h3>${item.marca}</h3>
        <p>Valor: R$ ${item.preco}</p>
        <p>Desconto: R$ ${item.descontoPreco}</p>
        <input type="number" min="1" value="${item.quantidade}" data-index="${index}" class="quantidade-input">
      `;
  
      cartItemsElem.appendChild(productElem);
    });
  
    const quantidadeInputs = document.getElementsByClassName('quantidade-input');
    Array.from(quantidadeInputs).forEach(input => {
      input.addEventListener('change', updateQuantidade);
    });
  }
  
  atualizaQuantidadeItensNoCarrinho();
  mostraItens();
  atualizaTotalizador();
  
  function updateQuantidade(event) {
    const itens = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = parseInt(event.target.dataset.index);
    const quantidade = parseInt(event.target.value);
  
    if (quantidade <= 0 || !quantidade) {
      itens.splice(index, 1);
    } else {
      itens[index].quantidade = quantidade;
    }
  
    localStorage.setItem('cartItems', JSON.stringify(itens));
    atualizaQuantidadeItensNoCarrinho();
    mostraItens();
    atualizaTotalizador();
  }
  
  // Função para calcular e exibir o resumo da compra
  function atualizaTotalizador() {
    const subtotalElem = document.getElementById('subtotal');
    const descontoElem = document.getElementById('discounts');
    const totalElem = document.getElementById('total');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    let subtotal = 0;
    let descontos = 0;
  
    cartItems.forEach(item => {
      subtotal += item.preco * item.quantidade;
      descontos += item.descontoPreco * item.quantidade;
    });
  
    const total = subtotal - descontos;
  
    subtotalElem.innerText = `R$ ${subtotal.toFixed(2)}`;
    descontoElem.innerText = `R$ ${descontos.toFixed(2)}`;
    totalElem.innerText = `R$ ${total.toFixed(2)}`;
  }
  
  function finalizarCompra() {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('cartItems');
    atualizaQuantidadeItensNoCarrinho();
    mostraItens();
    atualizaTotalizador();
  }
  
  const finalizarCompraBtn = document.getElementById('checkout-btn');
  finalizarCompraBtn.addEventListener('click', finalizarCompra);
  
  atualizaQuantidadeItensNoCarrinho();
  mostraItens();
  atualizaTotalizador();

  const continuarComprandoBtn = document.getElementById('continuar-comprando-btn');
  continuarComprandoBtn.addEventListener('click', continuarComprando);
  
  function continuarComprando() {
    window.location.href = '/index.html';
  }
  