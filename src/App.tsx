import './App.css'
import MainRoutes from './Routes/MainRoutes'
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Watermark } from 'antd';
import type { WatermarkProps } from 'antd';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, bsc, bscTestnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { useEffect, useState } from "react"

import loader from "../src/assets/Loader.gif"
import { ToastContainer } from 'react-toastify';

const { chains, publicClient } = configureChains([bscTestnet, mainnet, bsc], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'bro-bot',
  projectId: '59d61ba5d9cebbef8e4f2329e491852e',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const color = "#4c4e4f2c"
const fontSize = 20

const waterMark: WatermarkProps = {
  content: '',
  font: { color: typeof color === 'string' ? color : undefined, fontSize: typeof fontSize === 'number' ? fontSize : undefined },
}


function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // window.onload = () => {
    //   setLoading(false);
    // };
    // return () => {
    //   window.onload = null;
    // };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: '#274F60',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {
            loading ? (
              <div className='loader'>
                <img src={loader} alt="loader" />
              </div>
            ) : (
              <Watermark {...waterMark}>
                <MainRoutes />
                <ToastContainer />
              </Watermark>
            )
          }
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
