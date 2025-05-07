import React from 'react';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Soneium } from "./utils/SoneiumChain";
import Header from './components/Header';
import NFTMarketplace from './components/NFTMarketplace';
import './App.css';

function App() {
  // Use a default client ID if the environment variable is not set
  const clientId = process.env.REACT_APP_THIRDWEB_CLIENT_ID || "a37f843ccef648163abc82ab025e7cf7";

  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={Soneium}
      supportedChains={[Soneium]}
      dAppMeta={{
        name: "Unlockable Content Agency Marketplace",
        description: "Arte Eterno: Museo de Arte contemporaneo (MACQ)",
        logoUrl: "https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png",
        url: window.location.origin,
      }}
      autoConnect={true}
    >
      <div className="App">
        <Header />
        <NFTMarketplace />
      </div>
    </ThirdwebProvider>
  );
}

export default App;
