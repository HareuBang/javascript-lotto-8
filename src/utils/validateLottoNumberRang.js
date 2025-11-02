import { LOTTO } from "../constants/constants";
import { LOTTO_ERROR } from "../constants/errorMessage";
import ApplicationError from "./ApplicationError";

const validateLottoNumberRang = (number) => {
  if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
    throw new ApplicationError(LOTTO_ERROR.INVALID_RANGE);
  }
};

export default validateLottoNumberRang;
