class PurchaseLotto {
  #inputView;
  #outputView;
  #lottoSalesTerminal;

  constructor({ inputview, outputView, lottoSalesTerminal }) {
    this.#inputView = inputview;
    this.#outputView = outputView;
    this.#lottoSalesTerminal = lottoSalesTerminal;
  }

  run() {
    const amount = this.#inputView.handlePurchaseAmount();
    const lottoTicket = this.#lottoSalesTerminal.publishLottos(amount);
    this.#outputView.renderLottoTicket(lottoTicket);

    return lottoTicket;
  }
}

export default PurchaseLotto;
