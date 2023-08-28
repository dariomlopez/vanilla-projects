const initialVelocity = 0.02;
const velocityIncrease = 0.000001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.resetBallProps();
  }

  get horizontalPosition() {
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--horizontalX"));
  }

  set horizontalPosition(horizontalValue) {
    this.ballElement.style.setProperty("--horizontalX", horizontalValue);
  }

  get verticalPosition() {
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--verticalY"));
  }

  set verticalPosition(verticalValue) {
    this.ballElement.style.setProperty("--verticalY", verticalValue);
  }

  playgroundRect() {
    return this.ballElement.getBoundingClientRect();
  }

  resetBallProps() {
    this.horizontalPosition = 50;
    this.verticalPosition = 50;
    this.ballDirection = {
      horizontalPosition: 0
    }
    while (
      Math.abs(this.ballDirection.horizontalPosition) <= 0.2 || Math.abs(this.ballDirection.horizontalPosition >= 0.9)
    ){
      const headingDirection = randomNumber (0, 2 * Math.PI);
      this.ballDirection = {
        horizontalPosition: Math.cos(headingDirection),
        verticalPosition: Math.sin(headingDirection)
      }
    }
    this.velocity = initialVelocity;
  }

  updateBallPosition(delta) {
    this.horizontalPosition += this.ballDirection.horizontalPosition * this.velocity * delta;
    this.verticalPosition += this.ballDirection.verticalPosition * this.velocity * delta;
    this.velocity += velocityIncrease * delta;
    console.log(this.velocity)
    const playgroundRect = this.playgroundRect();

    if (
      playgroundRect.bottom >= window.innerHeight ||
      playgroundRect.top <= 0
    ){
      this.ballDirection.horizontalPosition *= -1;
    }

    if (
      playgroundRect.right >= window.innerWidth ||
      playgroundRect.left <= 0
    ){
      this.ballDirection.verticalPosition *= -1;
    }
  }
};

function randomNumber (min, max){
  return Math.random() * (max - min) + min;
}