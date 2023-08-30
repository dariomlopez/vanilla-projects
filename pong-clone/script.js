import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let lastTime;

/**function to update the frames of the ball */
function updateBallPosition(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.updateBallPosition(delta, [playerPaddle.paddleRectangle(), computerPaddle.paddleRectangle()]);
    computerPaddle.updatePaddle(delta, ball.verticalDirect)

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    /**the background color changes with the time of play */
    document.documentElement.style.setProperty("--hue", hue + delta * 0.009);
      /**If a point is lost the color of the background changes */
    if(pointLose()) {
      handleLose()
      document.documentElement.style.setProperty("--hue", hue * 30);
    }
  }

  lastTime = time;
  window.requestAnimationFrame(updateBallPosition);
};

function pointLose() {
  const playgroundRect = ball.playgroundRect();
  return playgroundRect.right >= window.innerWidth ||
    playgroundRect.left <= 0;
};

function handleLose() {
  const playgroundRect = ball.playgroundRect();
  if (playgroundRect.right >= window.innerWidth) {
      playerScore.textContent = parseInt(playerScore.textContent) + 1;
    
    } else {
      computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    ball.resetBallPosition();
    computerPaddle.resetPaddlePosition();
};

/** Event listener so the player paddle moves when the mouse moves */
document.addEventListener("mousemove", event => {
  /**event.x  */
  playerPaddle.position = (event.clientY / window.innerHeight) * 100
});

window.requestAnimationFrame(updateBallPosition);