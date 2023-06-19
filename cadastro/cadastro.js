$(document).ready(function() {
    $('#cadastroForm').submit(function(event) {
      var formularioValido = {valido: true};
      validaFormulario(formularioValido);
      enviaFormularioSemRecarregaraPagina(event)
      if (formularioValido.valido) {
      var formData = $(this).serializeArray();
      localStorage.setItem('cadastroData', JSON.stringify(formData));
      alert('Cadastro salvo com sucesso!');
      }
    });
  });

  const messages = {
    emptyfield: "Preencha o campo {field}",
    shortName: "O campo nome deve ter no mínimo 2 caracteres",
    invalidEmail: "Informe um endereço de email válido.",
    invalidDataNascimento: "Idade mínima de 13 anos não atingida.",
    invalidCpf: "CPF inválido.",
    invalidTelefone: "Telefone inválido.",
    invalidConfirmarSenha: "As senhas devem ser as mesmas"
}


function validaFormulario(formularioValido) {
  const inputsObrigatorios = getInputsObrigatorios();
  const spanError = document.querySelectorAll('.error-message');
  let index = 0;
  
  inputsObrigatorios.forEach(input => validaInput(input, spanError, index++, formularioValido))
}

function enviaFormularioSemRecarregaraPagina(event) {
  event.preventDefault();
}

function getInputsObrigatorios() {
return document.querySelectorAll('.required');
}

function validaInput(input, spanError, index, formularioValido) {
  let error = false;
  let message;
  if (isValueVazio(input.value)) {
      error = true;
      message = messages.emptyfield.replace('{field}', getNomePelaLabel(input));
      formularioValido.valido = false;
  } 
  else if(input.name==='nomeCompleto' && input.value.length<2){
      error = true;
      message = messages.shortName;
      formularioValido.valido = false;
  }
  else if(input.name==='email' && !validaEmail(input.value)){
      error = true;
      message = messages.invalidEmail;
      formularioValido.valido = false;
  }
  else if(input.name==='dataNascimento' && validarDataNascimento(input.value)){
    error = true;
    message = messages.invalidDataNascimento;
    formularioValido.valido = false;
  }
  else if(input.name==='cpf' && !validaCpf(input.value)) {
    error = true;
    message = messages.invalidCpf;
    formularioValido.valido = false;
  }
  else if(input.name==='telefone' && !validaTelefone(input.value)) {
    error = true;
    message = messages.invalidTelefone;
    formularioValido.valido = false;
  }
  else if(input.name==='confirmarSenha' && !validaConfirmarSenha(input.value)) {
    error = true;
    message = messages.invalidConfirmarSenha;
    formularioValido.valido = false;
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

function isValueVazio(value) {
  return value.trim() === ''
}

function validarDataNascimento(dataNascimento) {

  var dataMinima = new Date();
  dataMinima.setFullYear(dataMinima.getFullYear() - 13);
  var dataNascimentoObj = new Date(dataNascimento);

  if (dataNascimentoObj > dataMinima) {
    return true;
  } else {
    return false;
  }
}

function validaCpf(cpf) {
  return /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/.test(cpf)
}

function validaEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

function validaTelefone(telefone) {
  return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(telefone);
}

function validaConfirmarSenha(senha) {
  const inputSenha = document.getElementById('senha');
  const valorSenha = inputSenha.value;
  return senha === valorSenha;
}

  