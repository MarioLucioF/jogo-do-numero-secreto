let listaDeNumerosSorteados = [];
let numeroMaxioSorteio = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo <br> do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 a 10:'); 
}
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}
function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Descobriu o número secreto! com ${tentativas} ${palavraTentativa}.`;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Que pena! Você errou.');
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * numeroMaxioSorteio + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaxioSorteio){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio() ;
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
exibirMensagemInicial();
