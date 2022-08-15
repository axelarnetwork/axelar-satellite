import { AssetConfig, ChainInfo, loadAssets, loadChains } from "@axelar-network/axelarjs-sdk";
import { useEffect } from "react"
import { ENVIRONMENT as environment } from "../config/constants";
import { useSwapStore } from "../store";

export const useInitialChainList = () => {

    const { setAllChains, setSrcChain, setDestChain, setAllAssets, setAsset } = useSwapStore();

    useEffect(() => {
      loadChains({ environment}).then(chains => {
        setAllChains(chains);        
        setSrcChain(chains.find(
          (chain) => chain.chainName.toLowerCase() === "avalanche"
          ) as ChainInfo);
        setDestChain(chains.find(
          (chain) => chain.chainName.toLowerCase() === "moonbeam"
          ) as ChainInfo);
      })
      loadAssets({ environment }).then(assets =>  {
        setAllAssets(assets);
        setAsset(assets.find(asset => asset?.common_key[environment].includes("usdc")) as AssetConfig);
      })
    }, []);
}