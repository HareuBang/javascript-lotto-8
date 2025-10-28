import LottoOutlet from "../src/LottoOutlet";

describe("로또 판매점 테스트", () => {
  describe("askPurchaseAmount 기능 테스트", () => {
    test.each([
      ["1000", "1000"],
      ["5000", "5000"],
      ["12345", "12345"],
    ])(
      "입력값 %s에 대해 askPurchaseAmount가 %s를 반환해야 한다",
      async (inputAmount, expected) => {
        const mockInputView = {
          readPurchaseAmount: jest.fn().mockResolvedValue(inputAmount),
        };

        const lottoOutlet = new LottoOutlet({ inputView: mockInputView });
        const amount = await lottoOutlet.askPurchaseAmount();

        expect(amount).toBe(expected);
      }
    );
  });
});
