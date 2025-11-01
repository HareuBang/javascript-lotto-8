import OutputView from "../src/console/OutputView";

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
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
        [7, 11, 16, 35, 36, 44],
      ];

      const expected =
        "3개를 구매했습니다.\n[8, 21, 23, 41, 42, 43]\n[3, 5, 11, 16, 32, 38]\n[7, 11, 16, 35, 36, 44]";

      outputView.renderLottoTicket({ quantity, lottos });

      expect(mockPrint).toHaveBeenCalledTimes(1);
      expect(mockPrint).toHaveBeenCalledWith(expected);
    });
  });
});
