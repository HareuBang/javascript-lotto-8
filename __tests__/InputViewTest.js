import InputView from "../src/console/inputView.js";
import { NUMBER_ERROR } from "../src/constants/errorMessage.js";

describe("콘솔 입력 클래스 테스트", () => {
  let inputView;
  let mockReadLineAsync;

  beforeEach(() => {
    mockReadLineAsync = jest.fn();
    inputView = new InputView(mockReadLineAsync);
  });

  describe("handlePurchaseAmount 기능 테스트", () => {
    test("올바른 입력값을 입력하면 숫자로 변환하여 반환합니다.", async () => {
      mockReadLineAsync.mockResolvedValue("3000");

      const result = await inputView.handlePurchaseAmount();
      expect(result).toBe(3000);
    });
  });

  describe("handlePurchaseAmount 예외 테스트", () => {
    test.each([[""], ["   "]])(
      `입력값이 빈 문자열 또는 공백일 경우 "${NUMBER_ERROR.INPUT_EMPTY}" 에러를 반환합니다.`,
      async (amount) => {
        mockReadLineAsync.mockResolvedValue(amount);

        await expect(inputView.handlePurchaseAmount()).rejects.toThrow(
          NUMBER_ERROR.INPUT_EMPTY
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
});
