import { WINNING_CRITERIA } from "../constants/constants.js";
import validateLottoNumberRang from "../utils/validateLottoNumberRang.js";

class WinningLottoChecker {
  #matchLottos(lottoTicket, winningLotto, bonusNumber) {
    const lottos = lottoTicket.getLottos();
    const winningLottoNumbers = new Set(winningLotto.getNumber());
    const winningResult = WINNING_CRITERIA.map((criteria) => ({
      ...criteria,
      count: 0,
    }));

    lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumber();

      const matchCount = lottoNumbers.filter((number) =>
        winningLottoNumbers.has(number)
      ).length;

      let isBonus = false;
      if (matchCount === 5) isBonus = lottoNumbers.includes(bonusNumber);

      const matchCriteria = winningResult.find(
        (match) => match.matchCount === matchCount && match.isBonus === isBonus
      );

      if (matchCriteria) matchCriteria.count++;
    });

    return winningResult;
  }

  evaluateWinning(lottoTicket, winningLotto, bonusNumber) {
    validateLottoNumberRang(bonusNumber);

    return this.#matchLottos(lottoTicket, winningLotto, bonusNumber);
  }
}

export default WinningLottoChecker;
