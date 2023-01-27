import { validateCosmosAddress, validateEvmAddress } from "../address";
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

  describe("validateEvmAddress()", () => {
    describe("when wrong address", () => {
      let result: boolean;

      beforeEach(() => {
        result = validateEvmAddress("hello");
      });

      it("should return false", () => {
        expect(result).toEqual(false);
      });
    });

    describe("when evm address", () => {
      let result: boolean;

      beforeEach(() => {
        result = validateEvmAddress(
          "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        );
      });

      it("should return true", () => {
        expect(result).toEqual(true);
      });
    });
  });

  describe("validateCosmosAddress()", () => {
    describe("when wrong address", () => {
      let result: boolean;

      beforeEach(() => {
        result = validateCosmosAddress("hello", "osmo");
      });

      it("should return false", () => {
        expect(result).toEqual(false);
      });
    });

    describe("when cosmos address", () => {
      let result: boolean;

      beforeEach(() => {
        result = validateCosmosAddress(
          "osmo1r4495uasjw0yfs5ua7x35sadk6gdleyl5eyme5",
          "osmo"
        );
      });

      it("should return true", () => {
        expect(result).toEqual(true);
      });
    });

    describe("when wrong prefix", () => {
      let result: boolean;

      beforeEach(() => {
        result = validateCosmosAddress(
          "osmo1r4495uasjw0yfs5ua7x35sadk6gdleyl5eyme5",
          "kujira"
        );
      });

      it("should return true", () => {
        expect(result).toEqual(false);
      });
    });
  });
});
