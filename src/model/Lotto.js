import { LOTTO } from "../constants/constants.js";
import { LOTTO_ERROR } from "../constants/errorMessage.js";
import ApplicationError from "../utils/ApplicationError.js";
import validateLottoNumberRange from "../utils/validateLottoNumberRange.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new ApplicationError(LOTTO_ERROR.INVALID_COUNT);
    }

    if (new Set(numbers).size !== LOTTO.COUNT) {
      throw new ApplicationError(LOTTO_ERROR.DUPLICATE_NUMBER);
    }

    numbers.forEach((number) => validateLottoNumberRange(number));
  }

  // TODO: 추가 기능 구현
  getNumber() {
    return [...this.#numbers];
  }
}

export default Lotto;
