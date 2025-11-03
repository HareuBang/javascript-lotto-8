import WinningLottoService from "./controller/WinningLottoService.js";
import InputView from "./console/InputView.js";
import OutputView from "./console/OutputView.js";
import LottoFactory from "./model/LottoFactory.js";
import WinningLottoChecker from "./model/WinningLottoChecker.js";
import calculateRate from "./utils/calculateRate.js";
import LottoSalesTerminal from "./model/LottoSalesTerminal.js";
import LottoTicketFactory from "./model/LottoTicketFactory.js";
import randomPickUniqueNumber from "./utils/randomPickUniqueNumber.js";
import PurchaseLotto from "./controller/PurchaseLotto.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();
    const lottoFactory = LottoFactory.create;
    const lottoTicketFactory = LottoTicketFactory.create;

    // 로또 구입 금액을 입력받고 로또 구입
    const lottoSalesTerminal = new LottoSalesTerminal({
      randomPickUniqueNumber,
      lottoFactory,
      lottoTicketFactory,
    });
    const purchaseLotto = new PurchaseLotto({
      inputView,
      outputView,
      lottoSalesTerminal,
    });

    const lottoTicket = await purchaseLotto.run();

    // 당첨 로또와 보너스 번호를 입력받고 당첨을 확인
    const winningLottoChecker = new WinningLottoChecker();
    const winningLottoService = new WinningLottoService({
      inputView,
      outputView,
      lottoFactory,
      winningLottoChecker,
      calculateRate,
    });

    await winningLottoService.run(lottoTicket);
  }
}

export default App;
