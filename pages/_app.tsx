import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { ThirdwebProvider } from "@3rdweb/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Polygon Mumbai Chain ID is 80001, see https://chainlist.org
  const supportedChainIds = [80001];

  const connectors = {
    injected: {},
  };

  return (
    <>
      <Toaster />
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <ThirdwebProvider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <Layout title={pageProps.title}>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </>
  );
}
