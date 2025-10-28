import MissionUtils from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/message";

const readLineAsync = (question) =>
  MissionUtils.Console.readLineAsync(question);

const inputView = {
  readPurchaseAmount: () => readLineAsync(PROMPT.PURCHASE_AMOUNT),
};

export default inputView;
