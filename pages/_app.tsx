import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Modal } from "../components/web3";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Web3Modal />
    </>
  );
}

export default MyApp;
