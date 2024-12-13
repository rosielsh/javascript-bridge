import OutputView from "../views/OutputView.js";

class InputHandler {
  static async repeatUntilValidInput(callback) {
    try {
      return await callback();
    } catch (error) {
      OutputView.printError(error.message);
      return this.repeatUntilValidInput(callback);
    }
  }
}

export default InputHandler;
