import InputView from "../src/console/InputView.js";
import {
  INPUT_EMPTY_ERROR,
  NUMBER_ERROR,
} from "../src/constants/errorMessage.js";

describe("콘솔 입력 클래스 테스트", () => {
  let inputView;
  let mockReadLineAsync;

  beforeEach(() => {
    mockReadLineAsync = jest.fn();
    inputView = new InputView(mockReadLineAsync);
  });

  describe("handlePurchaseAmount 기능 테스트", () => {
    test("구입할 금액을 입력하면 숫자로 변환하여 반환합니다.", async () => {
      mockReadLineAsync.mockResolvedValue("3000");

      const result = await inputView.handlePurchaseAmount();
      expect(result).toBe(3000);
    });
  });

  describe("handleWinningLotto 기능 테스트", () => {
    test("당첨 번호를 입력하면 ,(쉼표)를 기준으로 분리된 숫자 배열을 반환합니다.", async () => {
      mockReadLineAsync.mockResolvedValue("7,6,4,11,32,24");

      const result = await inputView.handleWinningLotto();
      expect(result).toEqual([7, 6, 4, 11, 32, 24]);
    });
  });

  describe("handlePurchaseAmount 예외 테스트", () => {
    test.each([[""], ["   "]])(
      `입력값이 빈 문자열 또는 공백일 경우 "${INPUT_EMPTY_ERROR}" 에러를 반환합니다.`,
      async (amount) => {
        mockReadLineAsync.mockResolvedValue(amount);

        await expect(inputView.handlePurchaseAmount()).rejects.toThrow(
          INPUT_EMPTY_ERROR
        );
      }
    );

    test.each([["amount"], ["1500A0"], ["1000A"]])(
      `입력값이 숫자가 아닐 경우 "${NUMBER_ERROR.NOT_NUMBER}" 에러를 반환합니다. (입력: '%s')`,
      async (amount) => {
        mockReadLineAsync.mockResolvedValue(amount);

        await expect(inputView.handlePurchaseAmount()).rejects.toThrow(
          NUMBER_ERROR.NOT_NUMBER
        );
      }
    );

    test.each([["1000.1"], ["13000.0001"]])(
      `입력값이 정수가 아닐 경우 "${NUMBER_ERROR.NOT_INTEGER}" 에러를 반환합니다. (입력: '%s')`,
      async (amount) => {
        mockReadLineAsync.mockResolvedValue(amount);

        await expect(inputView.handlePurchaseAmount()).rejects.toThrow(
          NUMBER_ERROR.NOT_INTEGER
        );
      }
    );

    test.each([["0"], ["-1"], ["-1000"]])(
      `입력값이 0 이하일 경우 "${NUMBER_ERROR.NOT_POSITIVE_NUMBER}" 에러를 반환합니다. (입력: '%s')`,
      async (amount) => {
        mockReadLineAsync.mockResolvedValue(amount);

        await expect(inputView.handlePurchaseAmount()).rejects.toThrow(
          NUMBER_ERROR.NOT_POSITIVE_NUMBER
        );
      }
    );
  });

  describe("handleWinningLotto 예외 테스트", () => {
    test.each([[""], ["   "]])(
      `입력값이 빈 문자열 또는 공백일 경우 "${INPUT_EMPTY_ERROR}" 에러를 반환합니다. (입력: '%s')`,
      async (amount) => {
        mockReadLineAsync.mockResolvedValue(amount);

        await expect(inputView.handleWinningLotto()).rejects.toThrow(
          INPUT_EMPTY_ERROR
        );
      }
    );

    test(`입력값을 ,(쉼표)로 분리 후 요소들이 숫자가 아닐 경우 "${NUMBER_ERROR.NOT_NUMBER}" 에러를 반환합니다.`, async () => {
      const winningLotto = "1,2,A,4,5,6";

      mockReadLineAsync.mockResolvedValue(winningLotto);

      await expect(inputView.handleWinningLotto()).rejects.toThrow(
        NUMBER_ERROR.NOT_NUMBER
      );
    });

    test(`입력값을 ,(쉼표)로 분리 후 요소들이 숫자가 아닐 경우 "${NUMBER_ERROR.NOT_INTEGER}" 에러를 반환합니다.`, async () => {
      const winningLotto = "1,2,3.14,4,5,6";

      mockReadLineAsync.mockResolvedValue(winningLotto);

      await expect(inputView.handleWinningLotto()).rejects.toThrow(
        NUMBER_ERROR.NOT_INTEGER
      );
    });

    test.each([["1,2,3,0,5,6"], ["7,45,-1,3,9,1"]])(
      `입력값을 ,(쉼표)로 분리 후 요소들이 0 이하일 경우 "${NUMBER_ERROR.NOT_POSITIVE_NUMBER}" 에러를 반환합니다. (입력: '%s')`,
      async (winningLotto) => {
        mockReadLineAsync.mockResolvedValue(winningLotto);

        await expect(inputView.handleWinningLotto()).rejects.toThrow(
          NUMBER_ERROR.NOT_POSITIVE_NUMBER
        );
      }
    );
  });
});
