import BridgeGame from "../models/BridgeGame.js";
import BridgeMaker from "../models/BridgeMaker.js";
import BridgeRandomNumberGenerator from "../models/BridgeRandomNumberGenerator.js";
import InputHandler from "../utils/InputHandler.js";
import BridgeLengthValidator from "../validators/BridgeLengthValidator.js";
import UserInputValidator from "../validators/UserInputValidator.js";

class GameController {
  #inputView;
  #outputView;

  constructor({ inputView, outputView }) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async start() {
    const bridgeLength = await InputHandler.repeatUntilValidInput(() => this.#getBridgeLength());
    const bridge = BridgeMaker.makeBridge(bridgeLength, BridgeRandomNumberGenerator.generate);
    const bridgeGame = new BridgeGame(bridge);

    await this.#processGame(bridgeGame, bridgeLength);
  }

  async #processGame(bridgeGame, bridgeLength) {
    let moveMap = [];
    let totalCount = 1;
    let isSuccess = false;
    let isQuit = false;

    for (let size = 0; size < bridgeLength && !isSuccess && !isQuit; size++) {
      while (!isSuccess) {
        const moveDirection = await InputHandler.repeatUntilValidInput(() => this.#getMoveDirection());
        const canGo = bridgeGame.move(moveDirection);

        moveMap.push([moveDirection, canGo]);
        this.#outputView.printMap(moveMap);

        if (!canGo) {
          if (await this.#handleRetry(bridgeGame)) {
            moveMap = [];
            totalCount++;
            continue;
          } else {
            isQuit = true;
            break;
          }
        }

        if (bridgeGame.isFinish()) {
          isSuccess = true;
          break;
        }
      }
    }

    this.#outputView.printMap(moveMap, true);
    this.#outputView.printResult(isSuccess, totalCount);
  }

  async #handleRetry(bridgeGame) {
    const retryAnswer = await InputHandler.repeatUntilValidInput(() => this.#getRetry());

    if (retryAnswer === "R") {
      bridgeGame.retry();
      return true;
    }

    return false;
  }

  async #getBridgeLength() {
    const bridgeLen = await this.#inputView.readBridgeSize();
    const bridgeLenNumber = Number(bridgeLen);
    BridgeLengthValidator.validate(bridgeLenNumber);
    return bridgeLenNumber;
  }

  async #getMoveDirection() {
    const direction = await this.#inputView.readMoving();
    UserInputValidator.validateMove(direction);
    return direction;
  }

  async #getRetry() {
    const retry = await this.#inputView.readGameCommand();
    UserInputValidator.validateRetry(retry);
    return retry;
  }
}

export default GameController;
