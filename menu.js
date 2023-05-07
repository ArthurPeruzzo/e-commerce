$(document).ready(mostraMenuLateral());

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
  