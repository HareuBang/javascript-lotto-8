import { MissionUtils } from "@woowacourse/mission-utils";

class OutputView {
  #print;

  constructor(print = MissionUtils.Console.print) {
    this.#print = print;
  }

  renderLottoTicket(lottoTicket) {
    const quantity = lottoTicket.getQuantity();
    const lottos = lottoTicket.getLottos();

    const lottoQuantity = `${quantity}개를 구매했습니다.`;
    const lottoList = lottos
      .map((lotto) => `[${lotto.getNumber().join(", ")}]`)
      .join("\n");

    this.#print(`${lottoQuantity}\n${lottoList}`);
  }

  #bonusMessage(matchCount, isBonus) {
    if (matchCount === 5 && isBonus) {
      return `, 보너스 볼 일치`;
    }

    return "";
  }

  renderWinningDetails(winningDetails) {
    const winningDetailsMessage = winningDetails
      .map(({ matchCount, isBonus, prize, count }) => {
        const prizeMessage = prize.toLocaleString();
        const bonusMessage = this.#bonusMessage(matchCount, isBonus);

        return `${matchCount}개 일치${bonusMessage} (${prizeMessage}원) - ${count}개`;
      })
      .join("\n");

    this.#print(winningDetailsMessage);
  }

  renderRate(rate) {
    this.#print(`총 수익률은 ${rate}%입니다.`);
  }
}

export default OutputView;
