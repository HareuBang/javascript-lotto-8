import { LOTTO } from "../constants/constants.js";
import { AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR } from "../constants/errorMessage.js";
import randomPickUniqueNumber from "../utils/randomPickUniqueNumber.js";
import ApplicationError from "../utils/ApplicationError.js";

class LottoSalesTerminal {
  #price;
  #randomPickUniqueNumberFn;
  #lottoFactory;
  #lottoTicketFactory;

  constructor({
    randomPickUniqueNumberFn = randomPickUniqueNumber,
    lottoFactory,
    lottoTicketFactory,
  }) {
    this.#price = LOTTO.PRICE;
    this.#randomPickUniqueNumberFn = randomPickUniqueNumberFn;
    this.#lottoFactory = lottoFactory;
    this.#lottoTicketFactory = lottoTicketFactory;
  }

  #validateAmount(amount) {
    if (amount % this.#price !== 0)
      throw new ApplicationError(AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR);
  }

  #calculateQuantity(amount) {
    return Math.floor(amount / this.#price);
  }

  #issueLotto() {
    const lotto = this.#randomPickUniqueNumberFn();
    const sortedLotto = lotto.sort((a, b) => a - b);

    return this.#lottoFactory(sortedLotto);
  }

  #issueAutomaticLottos(quantity) {
    return Array.from({ length: quantity }, () => this.#issueLotto());
  }

  publishLottos(amount) {
    this.#validateAmount(amount);

    const quantity = this.#calculateQuantity(amount);
    const lottos = this.#issueAutomaticLottos(quantity);

    return this.#lottoTicketFactory({ amount, quantity, lottos });
  }
}

export default LottoSalesTerminal;
