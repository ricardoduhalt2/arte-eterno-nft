import React from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import './Header.css';

const Header = () => {
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
            theme="dark"
            btnTitle="Connect Wallet"
            modalTitle="Select Your Wallet"
            modalSize="wide"
            welcomeScreen={{
              title: "Unlockable Content Agency",
              subtitle: "Connect your wallet to mint NFTs",
              img: {
                src: "https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png",
                width: 150,
                height: 150,
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
