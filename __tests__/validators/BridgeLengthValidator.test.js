import BridgeLengthValidator from "../../src/validators/BridgeLengthValidator.js";

describe("BridgeLengthValidator 클래스 테스트", () => {
  test("다리 길이는 숫자가 아니면 에러가 발생한다", () => {
    const lengths = [undefined, null, NaN, {}, [], "string"];

    lengths.forEach((length) => {
      expect(() => BridgeLengthValidator.validate(length)).toThrow();
    });
  });

  test("다리 길이는 3~20사이의 숫자가 아니면 에러가 발생한다", () => {
    const lengths = [0, 21, Infinity];

    lengths.forEach((length) => {
      expect(() => BridgeLengthValidator.validate(length)).toThrow();
    });
  });
});
