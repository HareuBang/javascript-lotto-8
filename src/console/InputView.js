import { MissionUtils } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/message.js";
import ApplicationError from "../utils/ApplicationError.js";
import { INPUT_EMPTY_ERROR, NUMBER_ERROR } from "../constants/errorMessage.js";

const SPLIT_SEPARATOR = ",";

class InputView {
  #readLineAsync;

  constructor(readLineAsync = MissionUtils.Console.readLineAsync) {
    this.#readLineAsync = readLineAsync;
  }

  #validate(input) {
    if (input.trim() === "") {
      throw new ApplicationError(INPUT_EMPTY_ERROR);
    }
  }

  #validatePositiveNumber(input) {
    this.#validate(input);

    const inputNumber = Number(input);

    if (!Number.isFinite(inputNumber))
      throw new ApplicationError(NUMBER_ERROR.NOT_NUMBER);

    if (!Number.isInteger(inputNumber))
      throw new ApplicationError(NUMBER_ERROR.NOT_INTEGER);

    if (inputNumber <= 0)
      throw new ApplicationError(NUMBER_ERROR.NOT_POSITIVE_NUMBER);
  }

  #validateWinningLottoNumbers(input) {
    this.#validate(input);

    const inputArray = input.split(SPLIT_SEPARATOR);

    inputArray.forEach((element) => this.#validatePositiveNumber(element));
  }

  async handlePurchaseAmount() {
    const amountInput = await this.#readLineAsync(PROMPT.PURCHASE_AMOUNT);

    this.#validatePositiveNumber(amountInput);

    return Number(amountInput);
  }

  async handleWinningLotto() {
    const winningLottoInput = await this.#readLineAsync(PROMPT.WINNING_LOTTO);

    this.#validateWinningLottoNumbers(winningLottoInput);

    return winningLottoInput.split(SPLIT_SEPARATOR).map(Number);
  }

  async handleBonusNumber() {
    const bonusNumberInput = await this.#readLineAsync(PROMPT.BONUS_NUMBER);

    this.#validatePositiveNumber(bonusNumberInput);

    return Number(bonusNumberInput);
  }
}

export default InputView;
