import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'XOXO NFT Collection SiF',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //  <main className={`${prata.variable} font-sans`}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ToastContainer />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    //  </main>
  );
}

export default MyApp;
