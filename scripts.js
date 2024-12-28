//cotação das moedas
const USD = 6.09;
const EUR = 6.35;
const GBP = 7.65;

// pegando os elementos do HTML
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
//seleciono o footer que está dentro da main
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// manipulando o input amount para que receba somente números
amount.addEventListener("input", () => {
    const charactersRegex = /\D+/g;    
    
    // atribui ao próprio valor do amount e substitui os caracteres que passam pelo regex (que não são números) por espaços vazios para aprecerem apenas números
    amount.value = amount.value.replace(charactersRegex, "");
})

// manipulando o evento submit(enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault();

    //verifica se o valor atual do input é um dos cases para realizar a conversão com a função convertCurrencyCoin
    switch(currency.value) {
        case "USD":
            convertCurrencyCoin(amount.value, USD, "US$");
            break;
        case "EUR":
            convertCurrencyCoin(amount.value, EUR, "€");
            break;
        case "GBP":
            convertCurrencyCoin(amount.value, GBP, "£");
            break;
        default:
            alert("Moeda não encontrada!");
    }
}

// converte a moeda
function convertCurrencyCoin(amount, price, symbol) {
    try {
        //formata o valor que aparece da
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //calcula a conversão
        let total = amount * price;

        //verifica se o total não é um número
        if (isNaN(total)) {
            alert("Valor inválido! Por favor, digite o valor corretamente para realizar a conversão.");
        }

        //formata o valor total trocando o R$ por ""(vazio)
        total = formatCurrencyBRL(total).replace("R$", "");
        //apresenta o total no  HTML
        result.textContent = `${total} Reais`;

        //adicona a classe 'show-result' que estava com 'display: none' para mostrar o resultado, mudando no css para o 'display: block'
        footer.classList.add("show-result")
    } catch (error) {
        console.log(error);
        //caso não funcione, remove a classe para não aparecer o resultado, deixando o display como 'none'
        footer.classList.remove("show-result");
        alert("Não foi possível realizar a conversão! Tente novamente.");
    }
}

//formata a moeda para BRL
function formatCurrencyBRL (value) {
    //retorna o value para número e formartar a moeda para BRL com "toLocaleString"
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}