import { ERROR_PREFIX } from "../constants/errorMessage.js";

class ApplicationError extends Error {
  constructor(message) {
    super(`${ERROR_PREFIX} ${message}`);
  }
}

export default ApplicationError;
