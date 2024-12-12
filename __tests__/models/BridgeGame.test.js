import { MissionUtils } from "@woowacourse/mission-utils";
import BridgeGame from "../../src/models/BridgeGame.js";
import BridgeMaker from "../../src/models/BridgeMaker.js";
import BridgeRandomNumberGenerator from "../../src/models/BridgeRandomNumberGenerator.js";

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

describe("BridgeGame 클래스 테스트", () => {
  test("다리의 방향에 맞게 이동한 후 이동이 완료되었는지 확인할 수 있다", () => {
    const bridgeLength = 3;

    mockRandoms([1, 0, 1]);

    const bridge = BridgeMaker.makeBridge(bridgeLength, BridgeRandomNumberGenerator);
    const bridgeGame = new BridgeGame(bridge);

    bridgeGame.move("U");
    bridgeGame.move("D");
    bridgeGame.move("U");

    expect(bridgeGame.isFinish()).toEqual(true);
  });

  test("다리의 방향에 맞게 이동하지 않았다면 이동이 완료되지 않는다", () => {
    const bridgeLength = 3;

    mockRandoms([1, 0, 1]);

    const bridge = BridgeMaker.makeBridge(bridgeLength, BridgeRandomNumberGenerator);
    const bridgeGame = new BridgeGame(bridge);

    bridgeGame.move("U");
    bridgeGame.move("U");
    bridgeGame.move("U");

    expect(bridgeGame.isFinish()).toEqual(false);
  });
});
