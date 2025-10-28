class LottoOutlet {
  #inputView;

  constructor({ inputView }) {
    this.#inputView = inputView;
  }

  askPurchaseAmount() {
    return this.#inputView.readPurchaseAmount();
  }
}

export default LottoOutlet;
