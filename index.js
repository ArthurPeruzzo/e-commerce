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

const mapaDosItens = new Map([[1, new Item(1, "Samsung Galaxy", 999.99, 20.00, 1, "/imagens/galaxy2Grande.jpg")],
                                [2, new Item(2, "Xiaomi Redmi 9A", 1299.99, 20.00, 1, "/imagens/xiaomi.jpg")],
                                [3, new Item(3, "Iphone 13", 1599.99, 20.00, 1, "/imagens/iphone.jpg")],
                                [4, new Item(4, "Samsung Galaxy S21", 899.99, 20.00, 1, "/imagens/samsumg-galaxy2.jpg")]]);


$(document).ready(mostraMenuLateral(), getNumeroDeProdutosNoCarrinho());

  $(document).ready(mostraMenuSegundoNivel());

  $(document).on('click', function(event) {
    if (!$(event.target).closest('.menu-lateral').length && !ehEventoOpcaoMenuLateral(event)) {
      ocultaMenuLateral();
      ocultaMenuSegundoNivel();
    }
  })

  function ehEventoOpcaoMenuLateral (event) {
    return $(event.target).is('#opcao-menu-lateral') || 
           $(event.target).is('#opcao-menu-lateral span') ||
           $(event.target).is('#opcao-menu-lateral i');
  }

  function ocultaMenuLateral() {
    $('.menu-lateral').animate({
      width: '0px'
    }, 150, function() {
      $(this).css('display', 'none');
    });
  }

  function ocultaMenuSegundoNivel() {
    $('.menu-segundo-nivel').animate({
      width: '0px'
    }, 150, function() {
      $(this).css('display', 'none');
    });
  }

  function mostraMenuLateral() {
    $('#opcao-menu-lateral').click(function() {
      $('.menu-lateral').css('display', 'block').animate({
        width: '365px'
      }, 150);
    });
  }

  function mostraMenuSegundoNivel() {
    $('#iphoneId').click(function() {
      $('.menu-segundo-nivel').css('display', 'block').animate({
        width: '365px'
      }, 150);
    });
  }

  $('#comprar-1').click(function () {
    adicionaProdutoNoCarrinho(1)
  });

  $('#comprar-2').click(function () {
    adicionaProdutoNoCarrinho(2)
  });

  $('#comprar-3').click(function() {
    adicionaProdutoNoCarrinho(3)
  });

  $('#comprar-4').click(function() {
    adicionaProdutoNoCarrinho(4)
  });

  $('#imagem').click(function() {
    window.location.href = '/paginaProduto/paginaProduto.html';
  });

  
  $('#cadastrar').click(function() {
    window.location.href = '/cadastro/cadastro.html';
  });

  $('#carrinho').click(function() {
    window.location.href = '/carrinho/carrinho.html';
  });


  function getNumeroDeProdutosNoCarrinho() {
    const numeroProduto = document.getElementById("numero-produto");
    if (isCarrinhoVazio()) {
      numeroProduto.innerText = 0;
    } else {
      numeroProduto.innerText = countItensCarrinhos();
    }
  }

  function isCarrinhoVazio() {
    return !localStorage.getItem("cartItems");
  }

  function countItensCarrinhos() {
    if (isCarrinhoVazio()) return 0;
    return getItensCarrinho().length;
  }

  function getItensCarrinho() {
    return JSON.parse(localStorage.getItem("cartItems"));
  }

  function adicionaProdutoNoCarrinho(numero) {
    const itens = getItensCarrinho() || [];
    let itemMap = mapaDosItens.get(numero);

    if (itens.some(item => itemMap.id === item.id)) {
      alert("Item já adicionado no carrinho!")
    }  
    else {
        itens.push(itemMap);
        localStorage.setItem('cartItems', JSON.stringify(itens));
        alert("Item adicionado no carrinho!")
        getNumeroDeProdutosNoCarrinho();
      }
  }
  