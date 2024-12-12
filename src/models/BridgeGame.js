class BridgeGame {
  #bridge;
  #step; // 현재까지 맞은 개수(다음 위치)

  constructor(bridge) {
    this.#bridge = bridge;
    this.#step = 0;
  }

  // 갈 수 있는지의 여부를 확인하고 반환
  move(direction) {
    if (direction === "U") {
      if (this.#bridge[this.#step] === 1) {
        this.#step++;
        return true;
      }
      return false;
    }

    if (this.#bridge[this.#step] === 0) {
      this.#step++;
      return true;
    }

    return false;
  }

  retry() {
    this.#step = 0;
  }

  isFinish() {
    return this.#bridge.length === this.#step;
  }
}

export default BridgeGame;
