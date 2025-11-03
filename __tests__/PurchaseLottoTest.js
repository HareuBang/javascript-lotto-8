import PurchaseLotto from "../src/controller/PurchaseLotto.js";

test("사용자가 금액을 입력하면 로또 발행 및 출력이 정상적으로 동작한다", async () => {
  const amount = 2000;
  const quantity = 2;
  const lottos = [
    [7, 11, 30, 40, 42, 43],
    [2, 13, 22, 32, 38, 45],
  ];

  const mockInputView = { handlePurchaseAmount: jest.fn(() => amount) };
  const mockLottoSalesTerminal = {
    publishLottos: jest.fn(() => ({
      quantity,
      lottos,
    })),
  };
  const mockOutputView = { renderLottoTicket: jest.fn() };

  const purchaseLotto = new PurchaseLotto({
    inputView: mockInputView,
    lottoSalesTerminal: mockLottoSalesTerminal,
    outputView: mockOutputView,
  });

  await purchaseLotto.run();

  // InputView
  expect(mockInputView.handlePurchaseAmount).toHaveBeenCalledTimes(1);

  // LottoSalesTerminal
  expect(mockLottoSalesTerminal.publishLottos).toHaveBeenCalledTimes(1);
  expect(mockLottoSalesTerminal.publishLottos).toHaveBeenCalledWith(amount);

  // OutputView
  expect(mockOutputView.renderLottoTicket).toHaveBeenCalledTimes(1);
  expect(mockOutputView.renderLottoTicket).toHaveBeenCalledWith({
    quantity,
    lottos,
  });
});
