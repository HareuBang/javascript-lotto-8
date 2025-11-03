import { WINNING_CRITERIA } from "../constants/constants.js";
import validateLottoNumberRange from "../utils/validateLottoNumberRange.js";
import ApplicationError from "../utils/ApplicationError.js";
import { BONUS_NUMBER_DUPLICATE_ERROR } from "../constants/errorMessage.js";

class WinningLottoChecker {
  #validateBonusNumber(winningLotto, bonusNumber) {
    if (winningLotto.getNumber().includes(bonusNumber)) {
      throw new ApplicationError(BONUS_NUMBER_DUPLICATE_ERROR);
    }
  }

  #setupWinningResult(lottoTicket, winningLotto) {
    const lottos = lottoTicket.getLottos();
    const winningLottoNumbers = new Set(winningLotto.getNumber());
    const winningResult = WINNING_CRITERIA.map((criteria) => ({
      ...criteria,
      count: 0,
    }));

    return { lottos, winningLottoNumbers, winningResult };
  }

  #countMatches(lottoNumbers, winningLottoNumbers) {
    return lottoNumbers.filter((number) => winningLottoNumbers.has(number))
      .length;
  }

  #isBonusMatch(matchCount, lottoNumbers, bonusNumber) {
    return matchCount === 5 && lottoNumbers.includes(bonusNumber);
  }

  #updateWinningResult(lotto, winningLottoNumbers, bonusNumber, winningResult) {
    const lottoNumbers = lotto.getNumber();
    const matchCount = this.#countMatches(lottoNumbers, winningLottoNumbers);
    const isBonus = this.#isBonusMatch(matchCount, lottoNumbers, bonusNumber);

    const matchCriteria = winningResult.find(
      (match) => match.matchCount === matchCount && match.isBonus === isBonus
    );

    if (matchCriteria) matchCriteria.count++;
  }

  #matchLottos(lottoTicket, winningLotto, bonusNumber) {
    const { lottos, winningLottoNumbers, winningResult } =
      this.#setupWinningResult(lottoTicket, winningLotto);

    lottos.forEach((lotto) =>
      this.#updateWinningResult(
        lotto,
        winningLottoNumbers,
        bonusNumber,
        winningResult
      )
    );

    return winningResult;
  }

  evaluateWinning(lottoTicket, winningLotto, bonusNumber) {
    validateLottoNumberRange(bonusNumber);
    this.#validateBonusNumber(winningLotto, bonusNumber);

    return this.#matchLottos(lottoTicket, winningLotto, bonusNumber);
  }
}

export default WinningLottoChecker;
