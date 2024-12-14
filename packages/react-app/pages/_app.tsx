import { RainbowKitProvider, getDefaultConfig} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { Outfit as FontSans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ClientOnly from '@/components/CllientOnly';
import {
 liskSepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [liskSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode={true}>
            <ClientOnly>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              </ClientOnly>

          <Toaster position='top-center' />
        </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
