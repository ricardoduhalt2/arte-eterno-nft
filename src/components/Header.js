import React from 'react';
import { ConnectWallet, useNetwork } from "@thirdweb-dev/react";
import { Soneium } from "../utils/SoneiumChain";
import './Header.css';

const Header = () => {
  const { chain } = useNetwork();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img 
            src="https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png" 
            alt="Unlockable Content Agency" 
            className="logo" 
          />
        </div>
        <div className="title-container">
          <h1>Unlockable Content Agency Marketplace</h1>
          <h2>Arte Eterno: Museo de Arte contemporaneo (MACQ)</h2>
        </div>
        <div className="connect-wallet-container">
          <ConnectWallet 
            colorMode="dark"
            accentColor="#9333ea"
            switchToActiveChain={true}
            modalSize="wide"
            welcomeScreen={{
              title: "Unlockable Content Agency",
              subtitle: "Conecta tu wallet para adquirir NFTs exclusivos en Soneium",
              img: {
                src: "https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png",
                width: 150,
                height: 150,
              },
            }}
            modalTitleIconUrl="https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png"
          />
        </div>
      </div>
      {chain && chain.id !== Soneium.id && (
        <div className="network-warning">
          <p>Por favor, cambia a la red Soneium (Chain ID: 1868) para adquirir NFTs</p>
        </div>
      )}
    </header>
  );
};

export default Header;