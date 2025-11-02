import { LOTTO } from "./constants/constants.js";
import { LOTTO_ERROR } from "./constants/errorMessage.js";
import ApplicationError from "./utils/ApplicationError.js";

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

    const isInvalidRang = numbers.some(
      (number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER
    );

    if (isInvalidRang) {
      throw new ApplicationError(LOTTO_ERROR.INVALID_RANGE);
    }
  }

  // TODO: 추가 기능 구현
  getNumber() {
    return [...this.#numbers];
  }
}

export default Lotto;
