import { LOTTO } from "./constants/constants";
import { AMOUNT_ERROR } from "./constants/errorMessage";
import randomPickUniqueNumber from "./utils/randomPickUniqueNumber";

class LottoSalesTerminal {
  #price;
  #onRandomPickUniqueNumber;

  constructor(onRandomPickUniqueNumber = randomPickUniqueNumber) {
    this.#price = LOTTO.PRICE;
    this.#onRandomPickUniqueNumber = onRandomPickUniqueNumber;
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

  #issueAutomatic(quantity) {
    const lottos = Array.from({ length: quantity }, () =>
      this.#onRandomPickUniqueNumber()
    );

    return lottos.map((lotto) => [...lotto].sort((a, b) => a - b));
  }

  publishLottos(amountInput) {
    this.#validateAmount(amountInput);

    const amount = Number(amountInput);
    const quantity = this.#calculateQuantity(amount);

    return this.#issueAutomatic(quantity);
  }
}

export default LottoSalesTerminal;
