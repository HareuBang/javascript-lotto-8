import LottoSalesTerminal from "../src/model/LottoSalesTerminal.js";
import { AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR } from "../src/constants/errorMessage.js";
import { LOTTO } from "../src/constants/constants.js";

describe("로또 판매 단말기 테스트", () => {
  let lottoSalesTerminal;

  beforeEach(() => {
    const mockLottoFactory = jest.fn((numbers) => numbers);

    // 정렬되지 않은 로또 번호 배열들
    const mockRandomPickUniqueNumber = jest
      .fn()
      .mockReturnValueOnce([23, 41, 43, 21, 8, 42])
      .mockReturnValueOnce([5, 3, 16, 11, 38, 32])
      .mockReturnValueOnce([44, 36, 35, 16, 11, 7]);

    const mockLottoTicketFactory = jest.fn(({ amount, quantity, lottos }) => ({
      amount,
      quantity,
      lottos,
    }));

    lottoSalesTerminal = new LottoSalesTerminal({
      randomPickUniqueNumberFn: mockRandomPickUniqueNumber,
      lottoFactory: mockLottoFactory,
      lottoTicketFactory: mockLottoTicketFactory,
    });
  });

  describe("publishLottos 기능 테스트", () => {
    test.each([
      [
        "3000",
        3,
        [
          [8, 21, 23, 41, 42, 43],
          [3, 5, 11, 16, 32, 38],
          [7, 11, 16, 35, 36, 44],
        ],
      ],
      ["1000", 1, [[8, 21, 23, 41, 42, 43]]],
    ])(
      `로또 구입 금액 "%s" 원을 입력하면 로또 가격(${LOTTO.PRICE})으로 나눈 %d 수량의 오름차순으로 정렬된 로또를 발행한다`,
      (amount, quantity, lottos) => {
        expect(lottoSalesTerminal.publishLottos(amount)).toEqual({
          amount,
          quantity,
          lottos,
        });
      }
    );
  });

  describe("publishLottos 예외 테스트", () => {
    test.each([["1"], ["100"], ["999"], ["1001"], ["25400"]])(
      `구입 금액이 1000원 단위가 아닐 경우 "${AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR}" 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          AMOUNT_NOT_MULTIPLE_OF_PRICE_ERROR
        );
      }
    );
  });
});
