import WinningLottoChecker from "../src/model/WinningLottoChecker.js";

class MockLotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumber() {
    return [...this.numbers];
  }
}

class MockLottoTicket {
  constructor(lottos) {
    this.lottos = lottos;
  }

  getLottos() {
    return [...this.lottos];
  }
}

describe("당첨 여부 판단 클래스 테스트", () => {
  test("evaluateWinning - 당첨 여부를 판단하고 결과를 반환한다.", () => {
    const lottoTicket = new MockLottoTicket([
      new MockLotto([1, 2, 3, 4, 5, 6]), // 6개 일치
      new MockLotto([1, 2, 3, 4, 5, 10]), // 5개 일치, 보너스 없음
      new MockLotto([1, 2, 3, 4, 5, 11]), // 5개 일치, 보너스 없음
    ]);

    const winningLotto = new MockLotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const winningLottoChecker = new WinningLottoChecker();
    const result = winningLottoChecker.evaluateWinning(
      lottoTicket,
      winningLotto,
      bonusNumber
    );

    const sixMatch = result.find(
      (match) => match.matchCount === 6 && match.isBonus === false
    );
    const fiveMatch = result.find(
      (match) => match.matchCount === 5 && match.isBonus === false
    );

    expect(sixMatch.count).toEqual(1);
    expect(fiveMatch.count).toBe(2);
  });
});
