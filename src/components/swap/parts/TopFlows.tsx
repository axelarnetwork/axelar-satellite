import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { ENVIRONMENT } from "~/config/constants";

import { useSwapStore } from "~/store";

import { AssetConfigExtended } from "~/types";
import { SwapStatus } from "~/utils/enums";
import { makeAccessibleKeysHandler } from "~/utils/react";

const Icon = ({ src = "", alt = "" }) => (
  <Image src={src} alt={alt} width={35} height={35} />
);

const EthereumIcon = () => (
  <Icon src="/assets/chains/ethereum.logo.svg" alt="Ethereum" />
);

const UsdcIcon = () => <Icon src="/assets/tokens/uausdc.logo.svg" alt="USDC" />;

const OsmosisIcon = () => (
  <Icon src="/assets/chains/osmosis.logo.svg" alt="osmosis" />
);

export const Arrow = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5484 8.24495L9.21504 2.91161C9.16647 2.87062 9.10719 2.84437 9.0442 2.83595C8.9812 2.82753 8.91711 2.83729 8.85948 2.86409C8.80185 2.89089 8.75309 2.93361 8.71893 2.98721C8.68478 3.04081 8.66666 3.10306 8.66671 3.16661V6.16661H2.66671C2.04787 6.16661 1.45438 6.41245 1.01679 6.85003C0.579207 7.28762 0.333374 7.88111 0.333374 8.49995C0.333374 9.11879 0.579207 9.71228 1.01679 10.1499C1.45438 10.5874 2.04787 10.8333 2.66671 10.8333H8.66671V13.8333C8.66666 13.8968 8.68478 13.9591 8.71893 14.0127C8.75309 14.0663 8.80185 14.109 8.85948 14.1358C8.91711 14.1626 8.9812 14.1724 9.0442 14.1639C9.10719 14.1555 9.16647 14.1293 9.21504 14.0883L15.5484 8.75495C15.5855 8.72366 15.6154 8.68462 15.6359 8.64057C15.6564 8.59653 15.667 8.54853 15.667 8.49995C15.667 8.45136 15.6564 8.40337 15.6359 8.35932C15.6154 8.31527 15.5855 8.27624 15.5484 8.24495Z"
      fill="url(#paint0_linear_675_3126)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_675_3126"
        x1="0.333374"
        y1="8.51619"
        x2="15.667"
        y2="8.51619"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0062FE" />
        <stop offset="1" stopColor="#01F8F9" />
      </linearGradient>
    </defs>
  </svg>
);

export const TopFlows = () => {
  const {
    setSrcChain,
    setDestChain,
    setAsset,
    allAssets,
    allChains,
    swapStatus,
  } = useSwapStore();
  const [menuOpened, setMenuOpened] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpened) {
      (document?.activeElement as HTMLElement)?.blur();
    } else if (menuOpened && !menu?.current?.contains(document.activeElement)) {
      setMenuOpened(false);
    }
  }, [menuOpened]);

  if (![SwapStatus.IDLE].includes(swapStatus)) {
    return null;
  }

  function handleOnFlow0() {
    const polygon = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("polygon")
    ) as ChainInfo;
    const osmosis = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("osmosis")
    ) as ChainInfo;
    const asset = allAssets.find((asset) =>
      asset.common_key[ENVIRONMENT].includes("usdc")
    ) as AssetConfigExtended;

    setAsset(asset);
    setSrcChain(polygon);
    setDestChain(osmosis);
    setMenuOpened(false);
  }

  function handleOnFlow1() {
    const avax = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("ethereum")
    ) as ChainInfo;
    const moonbeam = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("osmosis")
    ) as ChainInfo;
    const asset = allAssets.find((asset) =>
      asset.common_key[ENVIRONMENT].includes("usdc")
    ) as AssetConfigExtended;

    setAsset(asset);
    setSrcChain(avax);
    setDestChain(moonbeam);
    setMenuOpened(false);
  }

  function handleOnFlow3() {
    const osmo = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("ethereum")
    ) as ChainInfo;
    const moonbeam = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("osmosis")
    ) as ChainInfo;
    const asset = allAssets.find(
      (asset) => asset.id === "eth"
    ) as AssetConfigExtended;

    setAsset(asset);
    setSrcChain(osmo);
    setDestChain(moonbeam);
    setMenuOpened(false);
  }

  function handleOnFlow2() {
    const moonbeam = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("ethereum")
    ) as ChainInfo;
    const osmo = allChains.find((chain) =>
      chain.chainName?.toLowerCase().includes("axelar")
    ) as ChainInfo;
    const asset = allAssets.find((asset) =>
      asset.common_key[ENVIRONMENT].includes("uaxl")
    ) as AssetConfigExtended;

    setAsset(asset);
    setSrcChain(moonbeam);
    setDestChain(osmo);
    setMenuOpened(false);
  }

  return (
    <div ref={menu} className="dropdown dropdown-end">
      <button
        onBlur={(e) => setMenuOpened(false)}
        className="px-3 py-1 rounded-lg border border-[#00a7ff] bg-[#003556] text-[#00a7ff] text-xs cursor-pointer font-semibold"
        onClick={(e) => setMenuOpened(menuOpened)}
      >
        Top Flows
      </button>
      <ul
        tabIndex={0}
        className="z-50 p-2 shadow-lg gap-y-2 dropdown-content menu bg-neutral rounded-box w-52 top-8"
        onFocus={(e) => setMenuOpened(true)}
      >
        <li
          className="border rounded-lg border-[#00b0f4]"
          {...makeAccessibleKeysHandler(handleOnFlow0)}
        >
          <div className="flex">
            <Icon src={"/assets/chains/polygon.logo.svg"} alt="polygon" />
            <Arrow />
            <UsdcIcon />
            <Arrow />
            <OsmosisIcon />
          </div>
        </li>
        <li
          className="border rounded-lg border-[#00b0f4]"
          {...makeAccessibleKeysHandler(handleOnFlow1)}
        >
          <div className="flex">
            <EthereumIcon />
            <Arrow />
            <UsdcIcon />
            <Arrow />
            <OsmosisIcon />
          </div>
        </li>
        <li
          className="border rounded-lg border-[#00b0f4]"
          {...makeAccessibleKeysHandler(handleOnFlow2)}
        >
          <div className="flex">
            <EthereumIcon />
            <Arrow />
            <Icon src="/assets/tokens/uaxl.logo.svg" alt="axelar" />
            <Arrow />
            <Icon src="/assets/chains/axelar.logo.svg" alt="axelar" />
          </div>
        </li>

        <li
          className="border rounded-lg border-[#00b0f4]"
          {...makeAccessibleKeysHandler(handleOnFlow3)}
        >
          <div className="flex">
            <EthereumIcon />
            <Arrow />
            <Icon src="/assets/tokens/weth-wei.logo.svg" alt="weth" />
            <Arrow />
            <OsmosisIcon />
          </div>
        </li>
      </ul>
    </div>
  );
};
