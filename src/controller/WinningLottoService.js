class WinningLottoService {
  #inputView;
  #lottoFactory;
  #outputView;
  #winningLottoChecker;
  #calculateRate;

  constructor({
    inputView,
    lottoFactory,
    outputView,
    winningLottoChecker,
    calculateRate,
  }) {
    this.#inputView = inputView;
    this.#lottoFactory = lottoFactory;
    this.#outputView = outputView;
    this.#winningLottoChecker = winningLottoChecker;
    this.#calculateRate = calculateRate;
  }

  async run(lottoTicket) {
    let winningLotto;

    while (true) {
      try {
        const winningLottosInput = await this.#inputView.handleWinningLotto();
        winningLotto = this.#lottoFactory(winningLottosInput);

        break;
      } catch (error) {
        this.#outputView.renderError(error.message);
      }
    }

    let winningDetails;

    while (true) {
      try {
        const bonusNumberInput = await this.#inputView.handleBonusNumber();
        winningDetails = this.#winningLottoChecker.evaluateWinning(
          lottoTicket,
          winningLotto,
          bonusNumberInput
        );

        break;
      } catch (error) {
        this.#outputView.renderError(error.message);
      }
    }

    this.#outputView.renderWinningDetails(winningDetails);
    const rate = this.#calculateRate(lottoTicket, winningDetails);
    this.#outputView.renderRate(rate);
  }
}

export default WinningLottoService;
