let cardsOnPlay;
let timer;
let seconds;
let timerInterval;
let game;
let srcImgsInGameArray;

let flippedCards;
let unpairedCards;
let pairedCards;
let allCardsOnPlay;

function shuffle() {
  return Math.random() - 0.5;
}

startGame();

function startGame() {
  cardsOnPlay = prompt(
    `Bem-vindo, com quantas cartas você gostaria de jogar?
     O Número inserido deve ser par entre 4 e 14.`
  );

  while (!(cardsOnPlay % 2 === 0 && cardsOnPlay > 3 && cardsOnPlay < 15)) {
    cardsOnPlay = prompt(
      `O Número inserido deve ser par entre 4 e 14. 
      Com quantas cartas você gostaria de jogar?`
    );
  }

  timer = document.querySelector("span");
  seconds = 0;
  timerInterval = setInterval(incrementTimer, 1000);

  game = document.querySelector(".game");
  game.innerHTML = "";
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

  const srcImgsArray = [
    "./imgs/bobrossparrot.gif",
    "./imgs/explodyparrot.gif",
    "./imgs/fiestaparrot.gif",
    "./imgs/metalparrot.gif",
    "./imgs/revertitparrot.gif",
    "./imgs/tripletsparrot.gif",
    "./imgs/unicornparrot.gif",
  ];

  srcImgsArray.sort(shuffle);

  let srcPairImgsArray = [];

  for (let i = 0; i < srcImgsArray.length; i++) {
    srcPairImgsArray.push(srcImgsArray[i]);
    srcPairImgsArray.push(srcImgsArray[i]);
  }

  srcImgsInGameArray = srcPairImgsArray.slice(0, cardsOnPlay);
  srcImgsInGameArray.sort(shuffle);

  flippedCards = 0;
  unpairedCards = 0;
  pairedCards = 0;

  allCardsOnPlay = document.querySelectorAll(".card");
}

function incrementTimer() {
  timer.innerHTML = `${++seconds}`;
}

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

function gameOver() {
  clearInterval(timerInterval);
  setTimeout(
    alert,
    400,
    `Você ganhou com ${flippedCards} cartas viradas e em ${seconds} segundos.`
  );

  setTimeout(() => {
    const response = confirm(`Você deseja jogar novamente?`);
    if (response) {
      timer.innerHTML = "0";
      startGame();
    }
  }, 1000);
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
          setTimeout(resetUnpairedCards, 400);

          if (pairedCards === Number(cardsOnPlay)) {
            gameOver();
          }
        } else {
          allCardsOnPlay[i].classList.remove("unpaired");
          setTimeout(unflippCard, 400, allCardsOnPlay[i]);
          setTimeout(unflippCard, 400, card);
          setTimeout(resetUnpairedCards, 400);
        }
      }
    }
  }
}
