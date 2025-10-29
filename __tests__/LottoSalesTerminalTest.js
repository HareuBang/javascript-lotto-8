import LottoSalesTerminal from "../src/LottoSalesTerminal.js";
import { AMOUNT_ERROR } from "../src/constants/errorMessage.js";
import { LOTTO_PRICE } from "../src/constants/constants.js";

describe("로또 판매 단말기 테스트", () => {
  describe("publishLottos 기능 테스트", () => {
    let lottoSalesTerminal;

    beforeEach(() => {
      // 정렬되지 않은 로또 번호 배열들
      const mockRandomPickUniqueNumber = jest
        .fn()
        .mockReturnValueOnce([23, 41, 43, 21, 8, 42])
        .mockReturnValueOnce([5, 3, 16, 11, 38, 32])
        .mockReturnValueOnce([44, 36, 35, 16, 11, 7]);

      lottoSalesTerminal = new LottoSalesTerminal(mockRandomPickUniqueNumber);
    });

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
      `로또 구입 금액 "%s" 원을 입력하면 로또 가격(${LOTTO_PRICE})으로 나눈 %d 수량의 오름차순으로 정렬된 로또를 발행한다`,
      (amount, _, expected) => {
        expect(lottoSalesTerminal.publishLottos(amount)).toEqual(expected);
      }
    );
  });

  describe("publishLottos 예외 테스트", () => {
    const lottoSalesTerminal = new LottoSalesTerminal();

    test.each([[""], ["   "]])(
      `구입 금액이 빈 문자열 또는 공백일 경우 "${AMOUNT_ERROR.INPUT_EMPTY}" 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          AMOUNT_ERROR.INPUT_EMPTY
        );
      }
    );

    test.each([["amount"], ["1500A0"], ["1000A"]])(
      `구입 금액이 숫자가 아닐 경우 "${AMOUNT_ERROR.NOT_NUMBER}" 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          AMOUNT_ERROR.NOT_NUMBER
        );
      }
    );

    test.each([["0"], ["-1"], ["-1000"]])(
      `구입 금액이 0 이하일 경우 "${AMOUNT_ERROR.NOT_POSITIVE_NUMBER}" 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          AMOUNT_ERROR.NOT_POSITIVE_NUMBER
        );
      }
    );

    test.each([["1"], ["100"], ["999"], ["1001"], ["25400"]])(
      `구입 금액이 1000원 단위가 아닐 경우 "${AMOUNT_ERROR.NOT_MULTIPLE_OF_PRICE}" 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          AMOUNT_ERROR.NOT_MULTIPLE_OF_PRICE
        );
      }
    );
  });
});
