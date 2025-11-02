import MissionUtils from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/message.js";
import { validatePositiveNumber } from "../utils/validatePositiveNumber.js";

class InputView {
  #readLineAsync;

  constructor(readLineAsync = MissionUtils.Console.readLineAsync) {
    this.#readLineAsync = readLineAsync;
  }

  async handlePurchaseAmount() {
    const amountInput = await this.#readLineAsync(PROMPT.PURCHASE_AMOUNT);

    validatePositiveNumber(amountInput);

    return Number(amountInput);
  }
}

export default InputView;
