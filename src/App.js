import GameController from "./controller/GameController.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async play() {
    const views = {
      inputView: InputView,
      outputView: OutputView,
    };

    await new GameController(views).start();
  }
}

export default App;
