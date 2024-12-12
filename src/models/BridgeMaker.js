const BridgeMaker = {
  // size만큼 다리 생성해서 0/1 채운다음 반환
  makeBridge(size, generateRandomNumber) {
    const bridge = Array.from({ length: size }, () => 0);

    for (let s = 0; s < size; s++) {
      bridge[s] = String(generateRandomNumber()) === "1" ? "U" : "D";
    }

    return bridge;
  },
};

export default BridgeMaker;
