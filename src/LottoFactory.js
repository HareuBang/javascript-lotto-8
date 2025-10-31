import Lotto from "./Lotto.js";

class LottoFactory {
  static create(numbers) {
    return new Lotto(numbers);
  }
}

export default LottoFactory;
