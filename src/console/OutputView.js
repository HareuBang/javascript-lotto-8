import MissionUtils from "@woowacourse/mission-utils";

class OutputView {
  #print;

  constructor(print = MissionUtils.Console.print) {
    this.#print = print;
  }

  renderLottoTicket({ quantity, lottos }) {
    const lottoQuantity = `${quantity}개를 구매했습니다.`;
    const lottoList = lottos.map((lotto) => `[${lotto.join(", ")}]`).join("\n");

    this.#print(`${lottoQuantity}\n${lottoList}`);
  }
}

export default OutputView;
