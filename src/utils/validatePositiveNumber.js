import ApplicationError from "./ApplicationError.js";
import { NUMBER_ERROR } from "../constants/errorMessage.js";

const validatePositiveNumber = (numberInput) => {
  if (numberInput.trim() === "")
    throw new ApplicationError(NUMBER_ERROR.INPUT_EMPTY);

  const validNumber = Number(numberInput);

  if (!Number.isFinite(validNumber))
    throw new ApplicationError(NUMBER_ERROR.NOT_NUMBER);

  if (!Number.isInteger(validNumber))
    throw new ApplicationError(NUMBER_ERROR.NOT_INTEGER);

  if (validNumber <= 0)
    throw new ApplicationError(NUMBER_ERROR.NOT_POSITIVE_NUMBER);
};

export default validatePositiveNumber;
