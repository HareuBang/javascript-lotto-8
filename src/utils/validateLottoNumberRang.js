import { LOTTO } from "../constants/constants.js";
import { LOTTO_ERROR } from "../constants/errorMessage.js";
import ApplicationError from "./ApplicationError.js";

const validateLottoNumberRang = (number) => {
  if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
    throw new ApplicationError(LOTTO_ERROR.INVALID_RANGE);
  }
};

export default validateLottoNumberRang;
