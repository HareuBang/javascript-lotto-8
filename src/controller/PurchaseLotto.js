class PurchaseLotto {
  #inputView;
  #outputView;
  #lottoSalesTerminal;

  constructor({ inputView, outputView, lottoSalesTerminal }) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#lottoSalesTerminal = lottoSalesTerminal;
  }

  async run() {
    let amount;
    let lottoTicket;

    while (true) {
      try {
        amount = await this.#inputView.handlePurchaseAmount();
        lottoTicket = this.#lottoSalesTerminal.publishLottos(amount);

        break;
      } catch (error) {
        this.#outputView.renderError(error.message);
      }
    }

    this.#outputView.renderLottoTicket(lottoTicket);

    return lottoTicket;
  }
}

export default PurchaseLotto;
