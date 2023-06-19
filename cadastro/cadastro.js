$(document).ready(function() {
    $('#cadastroForm').submit(function(event) {
      validaFormulario();
      enviaFormularioSemRecarregaraPagina(event)
      var formData = $(this).serializeArray();
      localStorage.setItem('cadastroData', JSON.stringify(formData));
      alert('Cadastro salvo com sucesso!');
    });
  });

  const messages = {
    emptyfield: "Preencha o campo {field}",
    shortName: "O campo nome deve ter no mínimo 2 caracteres",
    invalidEmail: "Informe um endereço de email válido. "
}


function validaFormulario() {
  const inputsObrigatorios = getInputsObrigatorios();
  const spanError = document.querySelectorAll('.error-message');
  let index = 0;
  
  inputsObrigatorios.forEach(input => validaInput(input, spanError, index++))
  
}

function enviaFormularioSemRecarregaraPagina(event) {
  event.preventDefault();
}

function getInputsObrigatorios() {
return document.querySelectorAll('.required');
}

function validaInput(input, spanError, index) {
  let error = false;
  let message;
  if (input.value.trim() === '') {
      error = true;
      message = messages.emptyfield.replace('{field}', getNomePelaLabel(input));
  } 
  else if(input.name==='nomeCompleto' && input.value.length<2){
      error = true;
      message = messages.shortName;
  }
  else if(input.name==='email' && !/\S+@\S+\.\S+/.test(input.value)){
      error = true;
      message = messages.invalidEmail;
  }

  if (error) {
    spanError[index].textContent = message;
    spanError[index].style.display = 'block';
    spanError[index].classList.add('errofont');
    input.classList.add('erroinput');
  }
  else {
      spanError[index].textContent = '';
      spanError[index].style.display = 'none';
      input.classList.remove('erroinput');
  }
}

function getNomePelaLabel(input) {
  var labelElement = input.labels[0];
return labelElement?.innerText.replace(":", "");
}

  