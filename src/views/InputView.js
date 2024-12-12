import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readBridgeSize() {
    return await this.getInput("다리 건너기 게임을 시작합니다.\n\n다리의 길이를 입력해주세요.\n");
  },

  async readMoving() {
    return await Console.readLineAsync("\n이동할 칸을 선택해주세요. (위: U, 아래: D)\n");
  },

  async readGameCommand() {
    return await Console.readLineAsync("\n게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n");
  },

  async getInput(message) {
    try {
      return await Console.readLineAsync(`${message}\n`);
    } catch (error) {
      return "";
    }
  },
};

export default InputView;
