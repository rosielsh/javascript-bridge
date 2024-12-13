import { generateError } from "../utils/generateError.js";

class UserInputValidator {
  static validateMove(input) {
    if (!["U", "D"].includes(input)) {
      generateError("잘못된 입력입니다.");
    }
  }

  static validateRetry(input) {
    if (!["R", "Q"].includes(input)) {
      generateError("잘못된 입력입니다.");
    }
  }
}

export default UserInputValidator;
