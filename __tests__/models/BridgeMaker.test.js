import { MissionUtils } from "@woowacourse/mission-utils";
import BridgeMaker from "../../src/models/BridgeMaker.js";
import BridgeRandomNumberGenerator from "../../src/models/BridgeRandomNumberGenerator.js";

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

describe("BridgeMaker 클래스 테스트", () => {
  test("다리 길이가 3일 때 길이가 3인 다리를 만든다", () => {
    const bridgeLength = 3;

    mockRandoms([1, 0, 1]);

    const bridge = BridgeMaker.makeBridge(bridgeLength, BridgeRandomNumberGenerator);

    expect(bridge).toHaveLength(bridgeLength);
    expect(bridge).toContain(0);
    expect(bridge).toContain(1);
    expect(bridge).not.toContain(2);
  });
});
