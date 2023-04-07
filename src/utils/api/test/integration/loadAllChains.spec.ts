import { CHAINS, ChainInfo } from "@axelar-network/axelarjs-sdk";

import * as _module from "../..";

const environment = "testnet";
const disabledChain = CHAINS.TESTNET.MOONBEAM?.toLowerCase();

jest.mock("../../getDisabledChains.ts");

xdescribe("loadAllChains", () => {
  xdescribe("when called", () => {
    let result: ChainInfo[];

    beforeEach(async () => {
      jest.spyOn(_module, "getDisabledChains").mockReturnValue([]);
      result = await _module.loadAllChains(environment);
    });

    it("should return all chains", () => {
      const foundChain = result.find(
        (chain) => chain.chainIdentifier[environment] === disabledChain
      );
      expect(foundChain).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when called with disabled chains", () => {
    let result: ChainInfo[];

    beforeEach(async () => {
      jest.spyOn(_module, "getDisabledChains").mockReturnValue([disabledChain]);
      result = await _module.loadAllChains(environment);
    });

    it("should return filtered chains", () => {
      const deletedChain = result.find(
        (chain) => chain.chainIdentifier[environment] === disabledChain
      );
      expect(deletedChain).toBeUndefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
