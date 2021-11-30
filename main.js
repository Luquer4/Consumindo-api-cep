'use strict';

const clearForm = (jsonAdress) => {
    document.getElementById('adress').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
}

const fillForm = (jsonAdress) => {
    document.getElementById('adress').value = jsonAdress.logradouro;
    document.getElementById('district').value = jsonAdress.bairro;
    document.getElementById('city').value = jsonAdress.localidade;
    document.getElementById('state').value = jsonAdress.uf;
}

const isNumber = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && isNumber(cep);

const pesquisarCep = async () => {
    clearForm();

    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const data = await fetch(url);
        const jsonAdress = await data.json();
        if (jsonAdress.hasOwnProperty('erro')) {
            document.getElementById('adress').value = 'CEP não encontrado!';
        } else {
            fillForm(jsonAdress);
        }
    } else {
        document.getElementById('adress').value = 'CEP incorreto!';
    }
}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);



