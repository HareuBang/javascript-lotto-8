class WinningLottoService {
  #inputView;
  #lottoFactory;

  constructor({ inputView, lottoFactory }) {
    this.#inputView = inputView;
    this.#lottoFactory = lottoFactory;
  }

  async run(lottoTicket) {
    const winningLottosInput = this.#inputView.handleWinningLotto();
    const winningLotto = lottoFactory(winningLottosInput);
  }
}

export default WinningLottoService;
