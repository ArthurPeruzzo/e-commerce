class Produto {
  constructor(marca, preco, descontoPreco, quantidade, imagem) {
      this.marca = marca;
      this.preco = preco;
      this.descontoPreco = descontoPreco;
      this.quantidade = quantidade;
      this.imagem = imagem;
  }
}


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

  $('#comprar').click(adicionaProdutoNoCarrinho);

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
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  }

  function adicionaProdutoNoCarrinho() {
    const itens = getItensCarrinho();



    const produto = new Produto("Exemplo", 60.00, 20.00, 3, "/imagens/galaxy2Grande.jpg");
    itens.push(produto);
    localStorage.setItem('cartItems', JSON.stringify(itens));

  }
  