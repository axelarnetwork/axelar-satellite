import { extractDenom } from "../extractDenom";

describe("utils", () => {
  const fullDenom = "transfer/channel-10/uusdc";
  const denom = "uusdc";

  describe("extractDenom()", () => {
    describe("when called with denom", () => {
      let result: string;
      beforeEach(() => {
        result = extractDenom(denom);
      });

      it("should return denom", () => {
        expect(result).toEqual(denom);
      });
    });

    describe("when called with full denom", () => {
      let result: string;
      beforeEach(() => {
        result = extractDenom(fullDenom);
      });

      it("should return denom", () => {
        expect(result).toEqual(denom);
      });
    });
  });
});
