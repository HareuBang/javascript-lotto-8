class WinningLottoChecker {
  #inputView;

  constructor({ inputView }) {
    this.#inputView = inputView;
  }

  async run(lottoTicket) {
    const winningLottosInput = this.#inputView.handleWinningLotto();
    const bonusNumberInput = this.#inputView.handleBonusNumber();
  }
}

export default WinningLottoChecker;
