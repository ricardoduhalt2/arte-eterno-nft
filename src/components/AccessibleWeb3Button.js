import React from 'react';
import { Web3Button, useNetwork, useNetworkMismatch, useSwitchChain } from "@thirdweb-dev/react";
import { Soneium } from "../utils/SoneiumChain";

// This component wraps the Web3Button and adds the necessary context for accessibility
const AccessibleWeb3Button = (props) => {  
  const networkMismatch = useNetworkMismatch();
  const { chain } = useNetwork();
  const switchChain = useSwitchChain();
  
  // Check if we're on the correct network
  const isCorrectNetwork = chain && chain.id === Soneium.id;
  
  // Handle the mint action with chain switching
  const handleAction = async (contract) => {
    try {
      // First switch to Soneium chain if needed
      if (networkMismatch || !isCorrectNetwork) {
        await switchChain(Soneium);
      }
      
      // Then execute the original action (mint)
      if (props.action) {
        await props.action(contract);
      }
    } catch (error) {
      console.error("Error during action:", error);
      alert("Failed to perform action: " + error.message);
    }
  };
  
  // The Dialog component from Radix UI used internally by Web3Button needs a DialogTitle
  // We're adding a custom attribute that will be picked up by the thirdweb components
  return (
    <div className="accessible-web3-button-wrapper" data-dialog-title="Mint NFT" data-dialog-description="Mint your NFT from this collection">
      <Web3Button
        contractAddress={props.contractAddress}
        action={handleAction}
        isDisabled={props.isDisabled}
        theme={props.theme}
        className={props.className}
      >
        {props.children}
      </Web3Button>
    </div>
  );
};

export default AccessibleWeb3Button;