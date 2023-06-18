// carrinho.js

// Função para atualizar a quantidade de itens no carrinho
function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCountElem.innerText = cartItems.length.toString();
  }
  
  // Função para exibir os produtos adicionados no carrinho
  function displayCartItems() {
    const cartItemsElem = document.getElementById('cart-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    cartItemsElem.innerHTML = '';
  
    cartItems.forEach(item => {
      const productElem = document.createElement('div');
      productElem.classList.add('product');
      productElem.innerHTML = `
        <img src="${item.imagem}" alt="${item.marca}">
        <h3>${item.marca}</h3>
        <p>Valor Normal: R$ ${item.preco}</p>
        <p>Valor Promocional: R$ ${item.descontoPreco}</p>
        <input type="number" min="1" value="${item.quantidade}" data-index="${item.index}" class="quantity-input">
      `;
  
      cartItemsElem.appendChild(productElem);
    });
  
    // Adicionar evento de alteração de quantidade de produto
    const quantityInputs = document.getElementsByClassName('quantity-input');
    Array.from(quantityInputs).forEach(input => {
      input.addEventListener('change', updateCartItemQuantity);
    });
  }

  // const exampleProduct = {
  //   marca: "Exemplo",
  //   description: "Produto de exemplo",
  //   preco: 50.00,
  //   descontoPreco: 40.00,
  //   quantidade: 2,
  //   imagem: "/imagens/galaxy2Grande.jpg"
  // };

  // const exampleProduct2 = {
  //   marca: "Exemplo",
  //   preco: 50.00,
  //   descontoPreco: 40.00,
  //   quantidade: 2,
  //   imagem: "/imagens/galaxy2Grande.jpg"
  // };

  // const exampleProduct3 = {
  //   marca: "Exemplo",
  //   preco: 50.00,
  //   descontoPreco: 40.00,
  //   quantidade: 2,
  //   imagem: "/imagens/galaxy2Grande.jpg"
  // };

  // const exampleProduct4 = {
  //   marca: "Exemplo",
  //   preco: 50.00,
  //   descontoPreco: 40.00,
  //   quantidade: 2,
  //   imagem: "/imagens/galaxy2Grande.jpg"
  // };
  
  // Verificar se há itens no localStorage, se não, adicionar o produto de exemplo
    // localStorage.setItem('cartItems', JSON.stringify([exampleProduct, exampleProduct2, exampleProduct3, exampleProduct4]));
  
  // Chamar as funções para atualizar a exibição
  updateCartCount();
  displayCartItems();
  updateCartSummary();
  
  // Função para atualizar a quantidade de um produto no carrinho
  function updateCartItemQuantity(event) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = parseInt(event.target.dataset.index);
    const quantidade = parseInt(event.target.value);
  
    if (quantidade <= 0) {
      // Remover o produto do carrinho se a quantidade for menor ou igual a zero
      cartItems.splice(index, 1);
    } else {
      // Atualizar a quantidade do produto
      cartItems[index].quantidade = quantidade;
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    displayCartItems();
    updateCartSummary();
  }
  
  // Função para calcular e exibir o resumo da compra
  function updateCartSummary() {
    const subtotalElem = document.getElementById('subtotal');
    const discountsElem = document.getElementById('discounts');
    const totalElem = document.getElementById('total');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    let subtotal = 0;
    let discounts = 0;
  
    cartItems.forEach(item => {
      subtotal += item.preco * item.quantidade;
      discounts += (item.preco - item.descontoPreco) * item.quantidade;
    });
  
    const total = subtotal - discounts;
  
    subtotalElem.innerText = `R$ ${subtotal.toFixed(2)}`;
    discountsElem.innerText = `R$ ${discounts.toFixed(2)}`;
    totalElem.innerText = `R$ ${total.toFixed(2)}`;
  }
  
  // Função para finalizar a compra
  function checkout() {
    // Implemente a lógica para finalizar a compra
    // Pode ser redirecionar o usuário para uma página de pagamento, por exemplo
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('cartItems');
    updateCartCount();
    displayCartItems();
    updateCartSummary();
  }
  
  // Adicionar evento de clique ao botão de finalizar compra
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', checkout);
  
  // Atualizar a quantidade de itens no carrinho ao carregar a página
  updateCartCount();
  
  // Exibir os produtos adicionados e atualizar o resumo da compra
  displayCartItems();
  updateCartSummary();
  
  