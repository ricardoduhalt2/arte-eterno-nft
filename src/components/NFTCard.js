import React from 'react'; // Added React import for JSX
import {
  createThirdwebClient,
  defineChain,
  getContract
} from "thirdweb";
import {
  NFTProvider,
  NFTMedia,
  NFTName,
  NFTDescription,
  ClaimButton
  // ConnectButton import removed as it's likely for Gallery
} from "thirdweb/react";

import { client, soneium } from '../config/thirdwebClient'; // Import centralized client and chain
import './NFTCard.css'; // Import the CSS file for NFTCard styles

// Props: name, contract, tokenId, tokenURI, claimPrice, supply, supplyClaimed
// name and tokenURI are implicitly used by NFTProvider components if needed.
function NFTCard({ contract, tokenId, claimPrice, supply, supplyClaimed }) {
  const contractInstance = getContract({
    address: contract,
    chain: soneium,
    client,
  });

  // Calculate remaining supply for display
  const remainingSupply = (supply !== undefined && supplyClaimed !== undefined)
    ? supply - supplyClaimed
    : 'N/A';

  return (
    <div className="nft-card" style={{ maxWidth: '280px', margin: '16px auto' }}> {/* Reduced maxWidth for smaller cards */}
      {/* eslint-disable-next-line no-undef */}
      <NFTProvider contract={contractInstance} tokenId={BigInt(tokenId)}>
        <NFTMedia className="nft-image" style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', borderRadius: '8px', objectFit: 'cover' }} />
        <div className="nft-details">
          <h3 className="nft-title" style={{ marginTop: '12px', marginBottom: '8px' }}><NFTName /></h3> {/* Adjusted bottom margin for new description size */}
          <p style={{ fontSize: '0.85em', color: '#666', minHeight: '3.4em', lineHeight: '1.4', fontWeight: '400' }}><NFTDescription /></p> {/* Smaller, modern description */}
        </div>
      </NFTProvider>
      <div style={{ marginTop: '12px', fontSize: '0.9em' }}> {/* Slightly smaller price/supply text */}
        <b>Precio:</b> {claimPrice ?? '—'} SONE
      </div>
      <div style={{ fontSize: '0.9em', marginBottom: '16px' }}> {/* Slightly smaller price/supply text */}
        <b>Supply restante:</b> {remainingSupply}
      </div>
      <ClaimButton
        contractAddress={contract}
        chain={soneium}
        client={client}
        claimParams={{ type: 'ERC721', quantity: 1n }}
        style={{ width: '100%', padding: '10px', fontSize: '0.95em', cursor: 'pointer' }} /* Slightly smaller button text */
      >
        Mint / Claim NFT
      </ClaimButton>
    </div>
  );
}

export default NFTCard;
