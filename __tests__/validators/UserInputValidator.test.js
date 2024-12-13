import UserInputValidator from "../../src/validators/UserInputValidator.js";

describe("UserInputValidator 클래스 테스트", () => {
  test("이동할 칸을 입력받을 때 U / D로만 입력할 수 있다", () => {
    const inputs = ["U", "D"];

    inputs.forEach((input) => {
      expect(() => UserInputValidator.validateMove(input)).not.toThrow();
    });
  });

  test("이동할 칸을 입력받을 때 U / D가 아니면 에러가 발생한다", () => {
    const inputs = [undefined, null, NaN, {}, [], "string", "A", "B", "C"];

    inputs.forEach((input) => {
      expect(() => UserInputValidator.validateMove(input)).toThrow("[ERROR]");
    });
  });

  test("재시도 여부를 입력받을 때 R / Q로만 입력할 수 있다", () => {
    const inputs = ["R", "Q"];

    inputs.forEach((input) => {
      expect(() => UserInputValidator.validateRetry(input)).not.toThrow();
    });
  });

  test("재시도 여부를 입력받을 때 R / Q가 아니면 에러가 발생한다", () => {
    const inputs = [undefined, null, NaN, {}, [], "string", "A", "B", "C"];

    inputs.forEach((input) => {
      expect(() => UserInputValidator.validateRetry(input)).toThrow("[ERROR]");
    });
  });
});
