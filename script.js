const url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";
const realInput = document.getElementById("real");
const dolarInput = document.getElementById("dolar");

// Faz uma requisição para a API de câmbio e converte o valor em dólares
function converterRealParaDolar(valorReal, taxaDolar) {
  const valorDolar = valorReal / taxaDolar;
  return valorDolar.toFixed(2); // Limita o valor a 2 casas decimais
}

function converterDolarParaReal(taxaDolar, valorReal) {
  const valorRealInput = taxaDolar * valorReal;
  return valorRealInput.toFixed(2);
}

// Obtém a taxa de câmbio USD-BRL da API e preenche o campo US$ com o valor convertido
function atualizarConversaoReal() {
  if (dolarInput.value === "") {
    realInput.value = "";
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const taxaDolar = data.USDBRL.high;
        const valorDolar = parseFloat(dolarInput.value.replace(",", ".")); // Converte a vírgula para ponto
        const valorReal = converterDolarParaReal(taxaDolar, valorDolar);

        realInput.value = valorReal;
      })
      .catch((error) => console.error(error));
  }
}

function atualizarConversaoDolar() {
  if (realInput.value === "") {
    dolarInput.value = "";
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const taxaDolar = data.USDBRL.high;
        const valorReal = parseFloat(realInput.value.replace(",", ".")); // Converte a vírgula para ponto
        const valorDolar = converterRealParaDolar(valorReal, taxaDolar);

        dolarInput.value = valorDolar;
        let result = document.querySelector(".result");
        result.textContent = `O valor convertido é de : ${dolarInput.value}`;
      })
      .catch((error) => console.error(error));
  }
}

// Adiciona um ouvinte de evento para detectar quando o usuário digitar um valor no campo R$
realInput.addEventListener("input", atualizarConversaoDolar);
dolarInput.addEventListener("input", atualizarConversaoReal);
