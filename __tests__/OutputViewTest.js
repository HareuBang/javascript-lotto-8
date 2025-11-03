import OutputView from "../src/console/OutputView.js";

class MockLotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumber() {
    return [...this.numbers];
  }
}

class MockLottoTicket {
  constructor(quantity, lottos) {
    this.quantity = quantity;
    this.lottos = lottos;
  }

  getQuantity() {
    return this.quantity;
  }

  getLottos() {
    return [...this.lottos];
  }
}

describe("콘솔 출력 클래스 테스트", () => {
  describe("renderLottoTicket 기능 테스트", () => {
    let outputView;
    let mockPrint;

    beforeEach(() => {
      mockPrint = jest.fn();
      outputView = new OutputView(mockPrint);
    });

    test("구매한 로또 수량과 로또 목록을 정상적으로 출력한다.", () => {
      const quantity = 3;
      const lottos = [
        new MockLotto([8, 21, 23, 41, 42, 43]),
        new MockLotto([3, 5, 11, 16, 32, 38]),
        new MockLotto([7, 11, 16, 35, 36, 44]),
      ];
      const mockLottoTicket = new MockLottoTicket(quantity, lottos);

      const expected =
        "3개를 구매했습니다.\n[8, 21, 23, 41, 42, 43]\n[3, 5, 11, 16, 32, 38]\n[7, 11, 16, 35, 36, 44]";

      outputView.renderLottoTicket(mockLottoTicket);

      expect(mockPrint).toHaveBeenCalledTimes(1);
      expect(mockPrint).toHaveBeenCalledWith(expected);
    });
  });

  describe("renderWinningDetails 기능 테스트", () => {
    let outputView;
    let mockPrint;

    beforeEach(() => {
      mockPrint = jest.fn();
      outputView = new OutputView(mockPrint);
    });

    test("당첨 내역을 정상적으로 출력한다.", () => {
      const winningDetails = [
        { matchCount: 3, isBonus: false, prize: 5_000, count: 3 },
        { matchCount: 4, isBonus: false, prize: 50_000, count: 0 },
        { matchCount: 5, isBonus: false, prize: 1_500_000, count: 0 },
        { matchCount: 5, isBonus: true, prize: 30_000_000, count: 1 },
        { matchCount: 6, isBonus: false, prize: 2_000_000_000, count: 1 },
      ];

      const expected =
        "3개 일치 (5,000원) - 3개\n4개 일치 (50,000원) - 0개\n5개 일치 (1,500,000원) - 0개\n5개 일치, 보너스 볼 일치 (30,000,000원) - 1개\n6개 일치 (2,000,000,000원) - 1개";

      outputView.renderWinningDetails(winningDetails);

      expect(mockPrint).toHaveBeenCalledTimes(1);
      expect(mockPrint).toHaveBeenCalledWith(expected);
    });
  });

  describe("renderRate 기능 테스트", () => {
    let outputView;
    let mockPrint;

    beforeEach(() => {
      mockPrint = jest.fn();
      outputView = new OutputView(mockPrint);
    });

    test("수익률을 정상적으로 출력한다.", () => {
      const amount = 8000;
      const totalWinningAmount = 5000;
      const rate = parseFloat(((totalWinningAmount / amount) * 100).toFixed(2));

      const expected = `총 수익률은 ${rate}%입니다.`;

      outputView.renderRate(rate);

      expect(mockPrint).toHaveBeenCalledTimes(1);
      expect(mockPrint).toHaveBeenCalledWith(expected);
    });
  });
});
