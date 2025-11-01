import MissionUtils from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/message.js";
import { validatePositiveNumber } from "../utils/validatePositiveNumber.js";

class InputView {
  #onrReadLineAsync;

  constructor(onrReadLineAsync = MissionUtils.Console.readLineAsync) {
    this.#onrReadLineAsync = onrReadLineAsync;
  }

  async handlePurchaseAmount() {
    const amountInput = await this.#onrReadLineAsync(PROMPT.PURCHASE_AMOUNT);

    validatePositiveNumber(amountInput);

    return Number(amountInput);
  }
}

export default InputView;
