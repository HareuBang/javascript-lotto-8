import { LOTTO } from "./constants/constants.js";
import { AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR } from "./constants/errorMessage.js";
import randomPickUniqueNumber from "./utils/randomPickUniqueNumber.js";
import ApplicationError from "./utils/ApplicationError.js";

class LottoSalesTerminal {
  #price;
  #onRandomPickUniqueNumber;
  #onLottoFactory;
  #onLottoTicketFactory;

  constructor({
    onRandomPickUniqueNumber = randomPickUniqueNumber,
    onLottoFactory,
    onLottoTicketFactory,
  }) {
    this.#price = LOTTO.PRICE;
    this.#onRandomPickUniqueNumber = onRandomPickUniqueNumber;
    this.#onLottoFactory = onLottoFactory;
    this.#onLottoTicketFactory = onLottoTicketFactory;
  }

  #validateAmount(amount) {
    if (amount % this.#price !== 0)
      throw new ApplicationError(AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR);
  }

  #calculateQuantity(amount) {
    return Math.floor(amount / this.#price);
  }

  #issueLotto() {
    const lotto = this.#onRandomPickUniqueNumber();
    const sortedLotto = lotto.sort((a, b) => a - b);

    return this.#onLottoFactory(sortedLotto);
  }

  #issueAutomaticLottos(quantity) {
    return Array.from({ length: quantity }, () => this.#issueLotto());
  }

  publishLottos(amount) {
    this.#validateAmount(amount);

    const quantity = this.#calculateQuantity(amount);
    const lottos = this.#issueAutomaticLottos(quantity);

    return this.#onLottoTicketFactory({ amount, quantity, lottos });
  }
}

export default LottoSalesTerminal;
