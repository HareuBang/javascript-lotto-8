import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO } from "../constants/constants.js";

const randomPickUniqueNumber = () =>
  MissionUtils.Random.pickUniqueNumbersInRange(
    LOTTO.MIN_NUMBER,
    LOTTO.MAX_NUMBER,
    LOTTO.COUNT
  );

export default randomPickUniqueNumber;
