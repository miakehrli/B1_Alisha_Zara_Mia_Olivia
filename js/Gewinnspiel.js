const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const blurOverlay = document.getElementById("blur-overlay");
const gameOverOverlay = document.getElementById("game-over-overlay");
const finalScore = document.getElementById("final-score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const game = document.getElementById("game");

let gameInterval;
let gameStarted = false;
let scoreCount = 0;

function jump() {
  if (!dino.classList.contains("jump-animation")) {
    dino.classList.add("jump-animation");
    setTimeout(() => dino.classList.remove("jump-animation"), 500);
  }
}

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  scoreCount = 0;
  score.innerText = "0";
  finalScore.innerText = "0";
  rock.style.left = "550px";
  rock.style.animation = "rock 1.33s infinite";

  blurOverlay.classList.add("hidden");
  gameOverOverlay.classList.add("hidden");
  game.style.filter = "none";

  document.addEventListener("keypress", jump);

  gameInterval = setInterval(() => {
    const dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );
    const rockLeft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    );

    score.innerText = ++scoreCount;

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      gameOver();
    }
  }, 50);
}

function gameOver() {
  clearInterval(gameInterval);
  rock.style.animation = "none";
  rock.style.left = "550px";
  gameStarted = false;

  document.removeEventListener("keypress", jump);

  finalScore.innerText = scoreCount;
  gameOverOverlay.classList.remove("hidden");
  game.style.filter = "blur(5px)";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
