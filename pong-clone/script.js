import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));


let lastTime;

/**function to update the frames of the ball */
function updateBallPosition(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.updateBallPosition(delta);
    computerPaddle.updatePaddle(delta, ball.verticalPosition)
  }
  lastTime = time;
  window.requestAnimationFrame(updateBallPosition);
}

/** Event listener so the player paddle moves when the mouse moves */
document.addEventListener("mousemove", event => {
  /**event.x  */
  playerPaddle.position = (event.clientY / window.innerHeight) * 100
})

window.requestAnimationFrame(updateBallPosition);