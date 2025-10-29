import { LOTTO_PRICE } from "./constants/constants";
import { AMOUNT_ERROR } from "./constants/errorMessage";

class LottoSalesTerminal {
  #price;

  constructor() {
    this.#price = LOTTO_PRICE;
  }

  #validateAmount(amountInput) {
    if (amountInput.trim() === "") throw new Error(AMOUNT_ERROR.INPUT_EMPTY);

    const validNumber = Number(amountInput);

    if (!Number.isFinite(validNumber)) throw new Error(AMOUNT_ERROR.NOT_NUMBER);

    if (validNumber <= 0) throw new Error(AMOUNT_ERROR.NOT_POSITIVE_NUMBER);

    if (validNumber % this.#price !== 0)
      throw new Error(AMOUNT_ERROR.NOT_MULTIPLE_OF_PRICE);
  }

  publishLottos(amountInput) {
    this.#validateAmount(amountInput);
  }
}

export default LottoSalesTerminal;
