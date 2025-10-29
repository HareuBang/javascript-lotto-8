import { MissionUtils } from "@woowacourse/mission-utils";

const randomPickUniqueNumber = () =>
  MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);

export default randomPickUniqueNumber;
