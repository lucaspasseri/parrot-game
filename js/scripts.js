let numeroDeCartas = prompt(
  `Bem-vindo, com quantas cartas você gostaria de jogar?
   O Número inserido deve ser par entre 4 e 14.`
);

while (
  !(numeroDeCartas % 2 === 0 && numeroDeCartas > 3 && numeroDeCartas < 15)
) {
  numeroDeCartas = prompt(
    `O Número inserido deve ser par entre 4 e 14. 
    Com quantas cartas você gostaria de jogar?`
  );
}

const seletorCronometro = document.querySelector("span");

let segundos = 1;

function incrementarCronometro() {
  seletorCronometro.innerHTML = `${segundos++}`;
}

const meuIntervalo = setInterval(incrementarCronometro, 1000);

const seletorJogo = document.querySelector(".game");

for (let i = 0; i < numeroDeCartas; i++) {
  seletorJogo.innerHTML += `<div class="card" onclick="selecionarCarta(this, ${i})">
                                <div class="front-face face">
                                    <img src="./imgs/front.png">
                                </div>
                                <div class="back-face face">
                                    <img/>
                                </div>     
                            </div>`;
}
srcImgsArray = [
  "./imgs/bobrossparrot.gif",
  "./imgs/explodyparrot.gif",
  "./imgs/fiestaparrot.gif",
  "./imgs/metalparrot.gif",
  "./imgs/revertitparrot.gif",
  "./imgs/tripletsparrot.gif",
  "./imgs/unicornparrot.gif",
];

function comparador() {
  return Math.random() - 0.5;
}

srcImgsArray.sort(comparador);

let srcPairImgsArray = [];

for (let i = 0; i < srcImgsArray.length; i++) {
  srcPairImgsArray.push(srcImgsArray[i]);
  srcPairImgsArray.push(srcImgsArray[i]);
}

let srcImgsInGameArray = srcPairImgsArray.slice(0, numeroDeCartas);

srcImgsInGameArray.sort(comparador);

let numeroDeCartasSemPar = 0;

let contadorCartasViradas = 0;

let contadorCartasComPar = 0;

const seletorCartas = document.querySelectorAll(".card");

function virarCarta(carta, index) {
  carta.classList.add("paraCima");
  carta
    .querySelector(".back-face img")
    .setAttribute("src", srcImgsInGameArray[index]);
  carta.querySelector(".front-face").style.transform = "rotateY(-180deg)";
  carta.querySelector(".back-face").style.transform = "rotateY(0deg)";
  contadorCartasViradas++;
}

function desvirarCarta(carta) {
  carta.classList.remove("paraCima");
  carta.querySelector(".back-face").style.transform = "rotateY(180deg)";
  carta.querySelector(".front-face").style.transform = "rotateY(0deg)";
}

function zerarNumeroDeCartasSemPar() {
  numeroDeCartasSemPar = 0;
  ativarClicks();
}

function desativarClicks() {
  for (let i = 0; i < numeroDeCartas; i++) {
    seletorCartas[i].removeAttribute("onclick");
  }
}

function ativarClicks() {
  for (let i = 0; i < numeroDeCartas; i++) {
    seletorCartas[i].setAttribute("onclick", `selecionarCarta(this, ${i})`);
  }
}

function selecionarCarta(carta, index) {
  if (!carta.classList.contains("paraCima") && numeroDeCartasSemPar === 0) {
    virarCarta(carta, index);
    carta.classList.add("semPar");
    numeroDeCartasSemPar++;
  } else if (
    !carta.classList.contains("paraCima") &&
    numeroDeCartasSemPar === 1
  ) {
    virarCarta(carta, index);
    numeroDeCartasSemPar++;
    desativarClicks();
    console.log(carta.querySelector(".back-face img").getAttribute("src"));

    for (let i = 0; i < numeroDeCartas; i++) {
      if (seletorCartas[i].classList.contains("semPar")) {
        if (
          seletorCartas[i]
            .querySelector(".back-face img")
            .getAttribute("src") ===
          carta.querySelector(".back-face img").getAttribute("src")
        ) {
          seletorCartas[i].classList.replace("semPar", "comPar");
          contadorCartasComPar++;
          carta.classList.add("comPar");
          contadorCartasComPar++;
          setTimeout(zerarNumeroDeCartasSemPar, 1000);
          console.log(contadorCartasComPar);
          console.log(numeroDeCartas);

          if (contadorCartasComPar === Number(numeroDeCartas)) {
            clearInterval(meuIntervalo);
            setTimeout(
              alert,
              1000,
              `Você ganhou com ${contadorCartasViradas} jogadas e em ${--segundos}segundos`
            );
          }
        } else {
          seletorCartas[i].classList.remove("semPar");
          setTimeout(desvirarCarta, 1000, seletorCartas[i]);
          setTimeout(desvirarCarta, 1000, carta);
          setTimeout(zerarNumeroDeCartasSemPar, 1000);
        }
      }
    }
  }
}
