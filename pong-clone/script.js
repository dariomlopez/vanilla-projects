import Ball from "./ball.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));


let lastTime;

/**function to update the frames of the ball */
function updateBallPosition(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.updateBallPosition(delta);
  }
  lastTime = time;
  window.requestAnimationFrame(updateBallPosition);
}

window.requestAnimationFrame(updateBallPosition);