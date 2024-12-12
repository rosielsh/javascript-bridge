import { generateError } from "../utils/generateError.js";

class BridgeLengthValidator {
  static validate(length) {
    this.#validateType(length);
    this.#validateRange(length);
  }

  static #validateType(length) {
    if (this.#isInvalidNumber(length)) {
      generateError("다리 길이는 숫자로 입력해야 합니다.");
    }
  }

  static #validateRange(length) {
    if (length < 3 || length > 20) {
      generateError("다리 길이는 3 ~ 20 사이의 숫자로 입력해야 합니다.");
    }
  }

  static #isInvalidNumber(input) {
    if (input === "" || input === null) {
      return true;
    }
    const number = Number(input);
    return !Number.isFinite(number);
  }
}

export default BridgeLengthValidator;
