import React from 'react';
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react";
import { Soneium } from "./utils/Soneium";
import Header from './components/Header';
import NFTMarketplace from './components/NFTMarketplace';
import './App.css';

function App() {
  const clientId = process.env.REACT_APP_THIRDWEB_CLIENT_ID;

  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={Soneium}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect()
      ]}
    >
      <div className="App">
        <Header />
        <NFTMarketplace />
      </div>
    </ThirdwebProvider>
  );
}

export default App;
