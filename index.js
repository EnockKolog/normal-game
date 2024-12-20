const gameBoard = document.getElementById("game-board");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let score =  0;
let time = 0;
let timerInterval;
let gameInProgress = false;

const images = [
  'images/image1.png', 
  'images/image2.png',
  'images/image3.png',
  'images/image4.png',
  'images/image5.png',
  'images/image6.png'
];

function shuffleCards() {
  const doubledImages = [...images, ...images]; // Duplicate the images
  return doubledImages.sort(() => Math.random() - 0.5); // Shuffle the images
}

function createCard(image) {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = image;
  card.appendChild(img);
  card.addEventListener("click", () => flipCard(card));
  return card;
}

function initializeGame() {
  cards = shuffleCards();
  gameBoard.innerHTML = ''; // Clear the game board
  flippedCards = [];
  matchedCards = 0;
  score = 0;
  scoreElement.textContent = score;

  cards.forEach(image => {
    const card = createCard(image);
    gameBoard.appendChild(card);
  });

  time = 0;
  timerElement.textContent = time;
  startTimer();
  gameInProgress = true;
}

function flipCard(card) {
  if (!gameInProgress || flippedCards.length === 2 || card.classList.contains("flipped")) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() { 
   const [card1, card2] = flippedCards;
  const img1 = card1.querySelector("img");
  const img2 = card2.querySelector("img");

  if (img1.src === img2.src) {
    matchedCards++;
    score += 10;
    scoreElement.textContent = score;

    if (matchedCards === images.length) {
      endGame();
    }
  } else {
    score -= 1;
    scoreElement.textContent = score;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }

  flippedCards = [];
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (gameInProgress) {
      time++;
      timerElement.textContent = time;
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  gameInProgress = false;
  alert(`Game Over! Your score: ${score}`);
}

function restartGame() {
  initializeGame();
}

restartButton.addEventListener("click", restartGame);

// Start a new game when the page loads
initializeGame();
  