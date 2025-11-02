import OutputView from "../src/console/OutputView.js";

class MockLotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
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
});
