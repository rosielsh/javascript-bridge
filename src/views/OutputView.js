import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printError(message) {
    Console.print(message);
    this.printEmptyLine();
  },

  printMap(moveMap, final = false) {
    if (final) {
      Console.print("최종 게임 결과");
    }

    const moveMapArr = Array.from({ length: 2 }, () => Array(moveMap.length).fill(" "));

    for (let i = 0; i < moveMap.length; i++) {
      const [direction, flag] = moveMap[i];

      if (direction === "U") {
        moveMapArr[0][i] = flag ? "O" : "X";
        continue;
      }

      moveMapArr[1][i] = flag ? "O" : "X";
    }

    Console.print("[ " + moveMapArr[0].join(" | ") + " ]");
    Console.print("[ " + moveMapArr[1].join(" | ") + " ]");
  },

  printResult(isSuccess, totalCount) {
    Console.print(`\n게임 성공 여부: ${isSuccess ? "성공" : "실패"}`);
    Console.print(`총 시도한 횟수: ${totalCount}`);
  },

  printEmptyLine() {
    Console.print("");
  },
};

export default OutputView;
