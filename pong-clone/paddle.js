const computerPaddleSpeed = 0.007;

export default class Paddle {
  constructor(paddleElement) {
    this.paddleElement = paddleElement;
    this.resetPaddlePosition();
  }

  get position() {
    return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"))
  }

  set position(positionValue) {
    this.paddleElement.style.setProperty("--position", positionValue)
  }

  paddleRectangle() {
    return this.paddleElement.getBoundingClientRect();
  }

  resetPaddlePosition() {
    this.position = 50;
  }

  updatePaddle(delta, ballHeight) {
    this.position += computerPaddleSpeed * delta * (ballHeight - this.position);
  }
}