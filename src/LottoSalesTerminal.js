import { LOTTO } from "./constants/constants";
import { AMOUNT_ERROR } from "./constants/errorMessage";
import randomPickUniqueNumber from "./utils/randomPickUniqueNumber";

class LottoSalesTerminal {
  #price;
  #onRandomPickUniqueNumber;
  #onLottoFactory;

  constructor({
    onRandomPickUniqueNumber = randomPickUniqueNumber,
    onLottoFactory,
  }) {
    this.#price = LOTTO.PRICE;
    this.#onRandomPickUniqueNumber = onRandomPickUniqueNumber;
    this.#onLottoFactory = onLottoFactory;
  }

  #validateAmount(amountInput) {
    if (amountInput.trim() === "") throw new Error(AMOUNT_ERROR.INPUT_EMPTY);

    const validNumber = Number(amountInput);

    if (!Number.isFinite(validNumber)) throw new Error(AMOUNT_ERROR.NOT_NUMBER);

    if (validNumber <= 0) throw new Error(AMOUNT_ERROR.NOT_POSITIVE_NUMBER);

    if (validNumber % this.#price !== 0)
      throw new Error(AMOUNT_ERROR.NOT_MULTIPLE_OF_PRICE);
  }

  #calculateQuantity(amount) {
    return Math.floor(amount / this.#price);
  }

  #issueLotto() {
    const lotto = this.#onRandomPickUniqueNumber();
    const sortedLotto = [...lotto].sort((a, b) => a - b);

    return this.#onLottoFactory(sortedLotto);
  }

  #issueAutomaticLottos(quantity) {
    return Array.from({ length: quantity }, () => this.#issueLotto());
  }

  publishLottos(amountInput) {
    this.#validateAmount(amountInput);

    const amount = Number(amountInput);
    const quantity = this.#calculateQuantity(amount);
    const lottos = this.#issueAutomaticLottos(quantity);

    return { quantity, lottos };
  }
}

export default LottoSalesTerminal;
