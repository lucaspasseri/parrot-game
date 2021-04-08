let numeroDeCartas = 
prompt("Bem-vindo, com quantas cartas você gostaria de jogar? O Número inserido deve ser par entre 4 e 14.");

while(!(numeroDeCartas % 2 === 0 && numeroDeCartas > 3 && numeroDeCartas < 15)){
    numeroDeCartas = 
    prompt("O Número inserido deve ser par entre 4 e 14. Com quantas cartas você gostaria de jogar?");
}

const seletorJogo = document.querySelector(".jogo");
for(let i = 0; i < numeroDeCartas; i++){
    seletorJogo.innerHTML += `<div class="carta" onclick="virarCarta(this, ${i})">
                                 <img src="./imgs/front.png">     
                              </div>`;
}

srcImgsArray = [];
srcImgsArray.push("./imgs/bobrossparrot.gif");
srcImgsArray.push("./imgs/bobrossparrot.gif");
srcImgsArray.push("./imgs/explodyparrot.gif");
srcImgsArray.push("./imgs/explodyparrot.gif");
srcImgsArray.push("./imgs/fiestaparrot.gif");
srcImgsArray.push("./imgs/fiestaparrot.gif");
srcImgsArray.push("./imgs/metalparrot.gif");
srcImgsArray.push("./imgs/metalparrot.gif");
srcImgsArray.push("./imgs/revertitparrot.gif");
srcImgsArray.push("./imgs/revertitparrot.gif");
srcImgsArray.push("./imgs/tripletsparrot.gif");
srcImgsArray.push("./imgs/tripletsparrot.gif");
srcImgsArray.push("./imgs/unicornparrot.gif");
srcImgsArray.push("./imgs/unicornparrot.gif");

let srcImgsArrayJogo = srcImgsArray.slice(0,numeroDeCartas);

function comparador() { 
	return Math.random() - 0.5; 
}

srcImgsArrayJogo.sort(comparador);

console.log("srcImgsArrayJogo:", srcImgsArrayJogo);
function virarCarta(cartaClickada, index){
    cartaClickada.querySelector("img").setAttribute("src", srcImgsArrayJogo[index]);
}

