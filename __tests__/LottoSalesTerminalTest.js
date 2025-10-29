import LottoSalesTerminal from "../src/LottoSalesTerminal.js";

describe("로또 판매 단말기 테스트", () => {
  describe("publishLottos 기능 테스트", () => {});

  describe("publishLottos 예외 테스트", () => {
    const lottoSalesTerminal = new LottoSalesTerminal();

    test.each([[""], ["   "]])(
      `구입 금액이 빈 문자열 또는 공백일 경우 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          "[ERROR] 구입 금액을 입력해 주세요."
        );
      }
    );

    test.each([["amount"], ["1500A0"], ["1000A"]])(
      `구입 금액이 숫자가 아닐 경우 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          "[ERROR] 구입 금액에 숫자를 입력해 주세요."
        );
      }
    );

    test.each([["0"], ["-1"], ["-1000"]])(
      `구입 금액이 0 이하일 경우 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          "[ERROR] 구입 금액은 0보다 커야 합니다."
        );
      }
    );

    test.each([["1"], ["100"], ["999"], ["1001"], ["25400"]])(
      `구입 금액이 1000원 단위가 아닐 경우 에러를 반환합니다. (입력: '%s')`,
      (amount) => {
        expect(() => lottoSalesTerminal.publishLottos(amount)).toThrow(
          "[ERROR] 구입 금액은 1000원 단위여야 합니다."
        );
      }
    );
  });
});
