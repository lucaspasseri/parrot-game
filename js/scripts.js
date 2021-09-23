let cardsOnPlay = prompt(
  `Bem-vindo, com quantas cartas você gostaria de jogar?
   O Número inserido deve ser par entre 4 e 14.`
);

while (!(cardsOnPlay % 2 === 0 && cardsOnPlay > 3 && cardsOnPlay < 15)) {
  cardsOnPlay = prompt(
    `O Número inserido deve ser par entre 4 e 14. 
    Com quantas cartas você gostaria de jogar?`
  );
}

const timer = document.querySelector("span");

let seconds = 1;

function incrementTimer() {
  timer.innerHTML = `${seconds++}`;
}

const timerInterval = setInterval(incrementTimer, 1000);

const game = document.querySelector(".game");

for (let i = 0; i < cardsOnPlay; i++) {
  game.innerHTML += `
    <div class="card" onclick="selectCard(this, ${i})">
      <div class="front-face face">
        <img src="./imgs/front.png">
      </div>
      <div class="back-face face">
        <img/>
      </div>     
    </div>
  `;
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

function shuffle() {
  return Math.random() - 0.5;
}

srcImgsArray.sort(shuffle);

let srcPairImgsArray = [];

for (let i = 0; i < srcImgsArray.length; i++) {
  srcPairImgsArray.push(srcImgsArray[i]);
  srcPairImgsArray.push(srcImgsArray[i]);
}

let srcImgsInGameArray = srcPairImgsArray.slice(0, cardsOnPlay);

srcImgsInGameArray.sort(shuffle);

let flippedCards = 0;

let unpairedCards = 0;

let pairedCards = 0;

const allCardsOnPlay = document.querySelectorAll(".card");

function flippCard(card, index) {
  card.classList.add("flipped-card");
  card
    .querySelector(".back-face img")
    .setAttribute("src", srcImgsInGameArray[index]);
  card.querySelector(".front-face").style.transform = "rotateY(-180deg)";
  card.querySelector(".back-face").style.transform = "rotateY(0deg)";
  flippedCards++;
}

function unflippCard(card) {
  card.classList.remove("flipped-card");
  card.querySelector(".back-face").style.transform = "rotateY(180deg)";
  card.querySelector(".front-face").style.transform = "rotateY(0deg)";
}

function resetUnpairedCards() {
  unpairedCards = 0;
  enableClicks();
}

function disableClicks() {
  for (let i = 0; i < cardsOnPlay; i++) {
    allCardsOnPlay[i].removeAttribute("onclick");
  }
}

function enableClicks() {
  for (let i = 0; i < cardsOnPlay; i++) {
    allCardsOnPlay[i].setAttribute("onclick", `selectCard(this, ${i})`);
  }
}

function selectCard(card, index) {
  if (!card.classList.contains("flipped-card") && unpairedCards === 0) {
    flippCard(card, index);
    card.classList.add("unpaired");
    unpairedCards++;
  } else if (!card.classList.contains("flipped-card") && unpairedCards === 1) {
    flippCard(card, index);
    unpairedCards++;
    disableClicks();
    console.log(card.querySelector(".back-face img").getAttribute("src"));

    for (let i = 0; i < cardsOnPlay; i++) {
      if (allCardsOnPlay[i].classList.contains("unpaired")) {
        if (
          allCardsOnPlay[i]
            .querySelector(".back-face img")
            .getAttribute("src") ===
          card.querySelector(".back-face img").getAttribute("src")
        ) {
          allCardsOnPlay[i].classList.replace("unpaired", "paired");
          pairedCards++;
          card.classList.add("paired");
          pairedCards++;
          setTimeout(resetUnpairedCards, 600);

          if (pairedCards === Number(cardsOnPlay)) {
            clearInterval(timerInterval);
            setTimeout(
              alert,
              600,
              `Você ganhou com ${flippedCards} cartas viradas e em ${--seconds} segundos.`
            );
          }
        } else {
          allCardsOnPlay[i].classList.remove("unpaired");
          setTimeout(unflippCard, 600, allCardsOnPlay[i]);
          setTimeout(unflippCard, 600, card);
          setTimeout(resetUnpairedCards, 600);
        }
      }
    }
  }
}
