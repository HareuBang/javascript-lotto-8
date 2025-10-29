class LottoSalesTerminal {
  #price;

  constructor() {
    this.#price = 1000;
  }

  #validateAmount(amountInput) {
    if (amountInput.trim() === "")
      throw new Error("[ERROR] 구입 금액을 입력해 주세요.");

    const validNumber = Number(amountInput);

    if (!Number.isFinite(validNumber))
      throw new Error("[ERROR] 구입 금액에 숫자를 입력해 주세요.");

    if (validNumber <= 0)
      throw new Error("[ERROR] 구입 금액은 0보다 커야 합니다.");

    if (validNumber % this.#price !== 0)
      throw new Error("[ERROR] 구입 금액은 1000원 단위여야 합니다.");
  }

  publishLottos(amountInput) {
    this.#validateAmount(amountInput);
  }
}

export default LottoSalesTerminal;
