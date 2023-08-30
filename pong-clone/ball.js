const initialVelocity = 0.02;
const velocityIncrease = 0.000001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.resetBallPosition();
  }

  get horizontalDirect() {
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--horizontalX"));
  }

  set horizontalDirect(horizontalValue) {
    this.ballElement.style.setProperty("--horizontalX", horizontalValue);
  }

  get verticalDirect() {
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--verticalY"));
  }

  set verticalDirect(verticalValue) {
    this.ballElement.style.setProperty("--verticalY", verticalValue);
  }

  playgroundRect() {
    return this.ballElement.getBoundingClientRect();
  }

  resetBallPosition() {
    this.horizontalDirect = 50;
    this.verticalDirect = 50;
    this.ballDirection = {
      horizontalDirect: 0
    }
    while (
      Math.abs(this.ballDirection.horizontalDirect) <= 0.2 || Math.abs(this.ballDirection.horizontalDirect >= 0.9)
    ){
      const headingDirection = randomNumber (0, 2 * Math.PI);
      this.ballDirection = {
        horizontalDirect: Math.cos(headingDirection),
        verticalDirect: Math.sin(headingDirection)
      }
    }
    this.velocity = initialVelocity;
  }

  updateBallPosition(delta, paddleRectangle) {
    this.horizontalDirect += this.ballDirection.horizontalDirect * this.velocity * delta;
    this.verticalDirect += this.ballDirection.verticalDirect * this.velocity * delta;
    this.velocity += velocityIncrease * delta;
    console.log(this.velocity)
    const playgroundRect = this.playgroundRect();

    if (
      playgroundRect.bottom >= window.innerHeight ||
      playgroundRect.top <= 0
    ){
      this.ballDirection.verticalDirect *= -1;
    };

    if (paddleRectangle.some(paddle => paddleCollision(paddle, playgroundRect))){
      this.ballDirection.horizontalDirect *= -1;
    };

    if (
      playgroundRect.right >= window.innerWidth ||
      playgroundRect.left <= 0
    ){
      this.ballDirection.horizontalDirect *= -1;
    }
  }
};

function randomNumber (min, max){
  return Math.random() * (max - min) + min;
}

function paddleCollision (paddleLeft, paddleRight){
  return (
    paddleLeft.left <= paddleRight.right &&
    paddleLeft.right >= paddleRight.left &&
    paddleLeft.top <= paddleRight.bottom &&
    paddleLeft.bottom >= paddleRight.top
    )
}