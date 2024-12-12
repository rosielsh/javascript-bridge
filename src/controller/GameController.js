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

    let moveMap = [];
    let totalCount = 1;
    let isSuccess = false;
    let isExit = false;

    while (!isExit) {
      // 전체 게임
      while (!isSuccess) {
        // 재시도 이내
        const moveDirection = await InputHandler.repeatUntilValidInput(() => this.#getMoveDirection());
        const canGo = bridgeGame.move(moveDirection);

        moveMap.push([moveDirection, canGo]);
        this.#outputView.printMap(moveMap);

        // 실패
        if (!canGo) {
          const retryAnswer = await InputHandler.repeatUntilValidInput(() => this.#getRetry());

          if (retryAnswer === "R") {
            bridgeGame.retry();
            moveMap = [];
            totalCount++;
            continue;
          }

          isExit = true;
          break;
        }

        if (bridgeGame.isFinish()) {
          isSuccess = true;
          isExit = true;
          break;
        }
      }
    }

    this.#outputView.printMap(moveMap, true);
    this.#outputView.printResult(isSuccess, totalCount);
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
