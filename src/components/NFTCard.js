import React, { useState } from 'react';
import { 
  useContract, 
  useContractMetadata,
  useClaimConditions,
  useActiveClaimConditionForWallet,
  useClaimIneligibilityReasons,
  useUnclaimedNFTSupply,
  useClaimedNFTSupply
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import AccessibleWeb3Button from './AccessibleWeb3Button';
import './NFTCard.css';

const NFTCard = ({ nft }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [claimQuantity, setClaimQuantity] = useState(1);
  const [isClaiming, setIsClaiming] = useState(false);

  // Get the NFT Drop contract
  const { contract } = useContract(nft.address, "nft-drop");

  // Get contract metadata - unused but kept for future use
  // const { data: contractMetadata = {}, isLoading: isLoadingMetadata = false } = useContractMetadata(contract) || {}; // Commented out as variables are unused

  // Get claim conditions - unused but kept for future use
  // const { data: claimConditions = [], isLoading: isLoadingClaimConditions = false } = useClaimConditions(contract) || {}; // Commented out as unused{}; // Commented out as unused

  // Get claimed and unclaimed supply
  const { data: unclaimedSupply } = useUnclaimedNFTSupply(contract);
  const { data: claimedSupply } = useClaimedNFTSupply(contract);

  // Get the active claim condition
  const { data: activeClaimCondition } = useActiveClaimConditionForWallet(contract, undefined);

  // Check if user is eligible to claim
  const { 
    data: claimIneligibilityReasons,
    isLoading: isLoadingClaimEligibility
  } = useClaimIneligibilityReasons(
    contract,
    {
      quantity: claimQuantity,
    },
  );

  // Check if user can claim
  const canClaim = 
    !isLoadingClaimEligibility &&
    claimIneligibilityReasons &&
    claimIneligibilityReasons.length === 0;

  // Format price
  const priceToMint = activeClaimCondition
    ? parseFloat(ethers.utils.formatUnits(activeClaimCondition.price, 18))
    : parseFloat(nft.pricePerToken);

  // Format supply
  const totalSupply = claimedSupply && unclaimedSupply 
    ? claimedSupply.add(unclaimedSupply).toString() 
    : "Loading...";

  const claimedOfTotal = claimedSupply 
    ? `${claimedSupply.toString()} / ${totalSupply}` 
    : "Loading...";

  return (
    <div 
      className={`nft-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="nft-image-container">
        <img 
          src={nft.mediaUrl} 
          alt={nft.name} 
          className="nft-image" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x400/222/fff?text=Image+Not+Available";
          }}
        />
        <div className="nft-glow"></div>
      </div>

      <div className="nft-details">
        <h3 className="nft-title">{nft.name}</h3>

        <div className="nft-info">
          <div className="nft-info-item">
            <span className="info-label">Price:</span>
            <span className="info-value">{priceToMint} ETH</span>
          </div>

          <div className="nft-info-item">
            <span className="info-label">Claimed:</span>
            <span className="info-value">{claimedOfTotal}</span>
          </div>
        </div>

        <div className="nft-action">
          <AccessibleWeb3Button
            contractAddress={nft.address}
            action={async (contract) => {
              setIsClaiming(true);
              try {
                await contract.erc721.claim(claimQuantity);
                alert("Successfully minted NFT!");
              } catch (err) {
                console.error("Failed to mint NFT", err);
                alert("Failed to mint NFT: " + err.message);
              } finally {
                setIsClaiming(false);
              }
            }}
            isDisabled={!canClaim || isClaiming}
            theme="dark"
            className="mint-button"
          >
            {isClaiming ? "Minting..." : "Mint NFT"}
          </AccessibleWeb3Button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;