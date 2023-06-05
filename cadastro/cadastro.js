$(document).ready(function() {
    $('#cadastroForm').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serializeArray();
      localStorage.setItem('cadastroData', JSON.stringify(formData));
      alert('Cadastro salvo com sucesso!');
    });
  });
  