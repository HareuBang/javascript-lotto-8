import MissionUtils from "@woowacourse/mission-utils";

const readLineAsync = (question) =>
  MissionUtils.Console.readLineAsync(question);

const inputView = {
  readPurchaseAmount: () => readLineAsync("구입금액을 입력해 주세요.\n"),
};

export default inputView;
