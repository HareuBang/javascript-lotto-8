import LottoSalesTerminal from "../src/LottoSalesTerminal.js";
import { AMOUNT_ERROR } from "../src/constants/errorMessage.js";

describe("로또 판매 단말기 테스트", () => {
  describe("publishLottos 기능 테스트", () => {});

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
