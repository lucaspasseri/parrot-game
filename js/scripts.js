/* let numeroDeCartas = 
prompt("Bem-vindo, com quantas cartas você gostaria de jogar? O Número inserido deve ser par entre 4 e 14."); */
let numeroDeCartas = 8;

while(!(numeroDeCartas % 2 === 0 && numeroDeCartas > 3 && numeroDeCartas < 15)){
    numeroDeCartas = 
    prompt("O Número inserido deve ser par entre 4 e 14. Com quantas cartas você gostaria de jogar?");
}

const seletorJogo = document.querySelector(".jogo");

for(let i = 0; i < numeroDeCartas; i++){
    seletorJogo.innerHTML += `<div class="carta" onclick="selecionarCarta(this, ${i})">
                                 <img src="./imgs/front.png">     
                              </div>`;
}
srcImgsArray = [
    "./imgs/bobrossparrot.gif",
    "./imgs/explodyparrot.gif",
    "./imgs/fiestaparrot.gif",
    "./imgs/metalparrot.gif",
    "./imgs/revertitparrot.gif",
    "./imgs/tripletsparrot.gif",
    "./imgs/unicornparrot.gif"
]

function comparador() { 
	return Math.random() - 0.5; 
}

srcImgsArray.sort(comparador);

let srcPairImgsArray = [];

for(let i = 0; i < srcImgsArray.length; i++){
    srcPairImgsArray.push(srcImgsArray[i]);
    srcPairImgsArray.push(srcImgsArray[i]);
}

let srcImgsInGameArray = srcPairImgsArray.slice(0, numeroDeCartas);

srcImgsInGameArray.sort(comparador);

const seletorCartas = document.querySelectorAll(".carta");

let numeroDeCartasSemPar = 0; // não pode ser maior que 2

let contadorCartasViradas = 0;

let contadorCartasComPar = 0;

function virarCarta(carta, index){
    carta.classList.add("paraCima");
    //carta.classList.add("rotacao-para-cima");
    carta.querySelector("img").setAttribute("src",srcImgsInGameArray[index]);
    contadorCartasViradas++; 
}

function desvirarCarta(carta){
    carta.classList.remove("paraCima");
    //carta.classList.add("rotacao-para-baixo");
    carta.querySelector("img").setAttribute("src", "./imgs/front.png");
}

function zerarNumeroDeCartasSemPar(){
    numeroDeCartasSemPar = 0;
}

function selecionarCarta(carta, index){
    if(!carta.classList.contains("paraCima") && numeroDeCartasSemPar === 0){ //se a carta não esta para cima e nenhuma carta semPar
        virarCarta(carta, index); // vira a carta
        carta.classList.add("semPar"); // adiciona a classe semPar
        numeroDeCartasSemPar ++; // número de cartas semPar incrementado
    } else if (!carta.classList.contains("paraCima") &&  numeroDeCartasSemPar === 1 ) { // se a carta não esta para cima e tem uma carta semPar
        virarCarta(carta, index);
        //carta.classList.add("semPar");
        numeroDeCartasSemPar ++;
        for(let i = 0; i < numeroDeCartas; i++){ 
            if(seletorCartas[i].classList.contains("semPar")){ 
        
                if(seletorCartas[i].querySelector("img").getAttribute("src") === 
                carta.querySelector("img").getAttribute("src")){
                    seletorCartas[i].classList.replace("semPar","comPar");
                    contadorCartasComPar++;
                    carta.classList.add("comPar");
                    contadorCartasComPar++;
                    numeroDeCartasSemPar = 0;
                    
                }
                else if(seletorCartas[i].querySelector("img").getAttribute("src") !== 
                carta.querySelector("img").getAttribute("src")) {
                    seletorCartas[i].classList.remove("semPar");
                    setTimeout(desvirarCarta, 1000, seletorCartas[i]);
                    setTimeout(desvirarCarta, 1000, carta);
                    numeroDeCartasSemPar = 0;
                }
            }
        }
    }
    if(contadorCartasComPar === numeroDeCartas){
        setTimeout(alert, 100, `Você ganhou em ${contadorCartasViradas} jogadas!`);
        
    } 
}

