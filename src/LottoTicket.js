class LottoTicket {
  #amount;
  #lottos;
  #quantity;

  constructor({ amount, lottos, quantity }) {
    this.#amount = amount;
    this.#lottos = lottos;
    this.#quantity = quantity;
  }

  getAmount() {
    return this.#amount;
  }

  getLottos() {
    return [...this.#lottos];
  }

  getQuantity() {
    return this.#quantity;
  }
}

export default LottoTicket;
