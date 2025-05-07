import React, { useState } from 'react';
import { 
  useContract, 
  useContractMetadata,
  useClaimConditions,
  useActiveClaimConditionForWallet,
  useClaimIneligibilityReasons,
  useUnclaimedNFTSupply,
  useClaimedNFTSupply,
  Web3Button
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import './NFTCard.css';

const NFTCard = ({ nft }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [claimQuantity, setClaimQuantity] = useState(1);
  const [isClaiming, setIsClaiming] = useState(false);  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // Get the NFT Drop contract
  const { contract } = useContract(nft.address, "nft-drop");

  // Get contract metadata
  const { data: contractMetadata, isLoading: isLoadingMetadata } = useContractMetadata(contract);

  // Get claim conditions
  const { data: claimConditions, isLoading: isLoadingClaimConditions } = useClaimConditions(contract);

  // Get claimed and unclaimed supply
  const { data: unclaimedSupply } = useUnclaimedNFTSupply(contract);
  const { data: claimedSupply } = useClaimedNFTSupply(contract);
  
  // Get the active claim condition
  const { data: activeClaimCondition } = useActiveClaimConditionForWallet(contract, undefined, claimQuantity);

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
  // Funciu00f3n para obtener mu00faltiples URLs de IPFS para intentar diferentes gateways
  const getIPFSUrls = (ipfsUri) => {
    if (!ipfsUri || typeof ipfsUri !== 'string') {
      return {
        primary: '',
        fallbacks: []
      };
    }

    // Si la URL ya es una URL HTTP completa, usu00e1mosla directamente
    if (ipfsUri.startsWith('http')) {
      return {
        primary: ipfsUri,
        fallbacks: []
      };
    }

    // Extraer el CID (Content Identifier) de la URI de IPFS
    const cid = ipfsUri.replace('ipfs://', '');
    
    return {
      primary: `https://ipfs.io/ipfs/${cid}`,
      fallbacks: [
        `https://gateway.pinata.cloud/ipfs/${cid}`,
        `https://cloudflare-ipfs.com/ipfs/${cid}`,
        `https://ipfs.infura.io/ipfs/${cid}`,
        `https://dweb.link/ipfs/${cid}`
      ]
    };
  };

  // Obtener las URLs para la imagen
  const { primary: mediaUrl, fallbacks } = getIPFSUrls(nft.mediaUrl);

  // Intentar cargar la imagen desde diferentes gateways si falla la principal
  useEffect(() => {
    if (imageError && fallbacks.length > 0) {
      const img = new Image();
      const fallbackUrl = fallbacks[0];
      
      img.onload = () => {
        setImageLoaded(true);
        setImageError(false);
      };
      
      img.onerror = () => {
        // Si falla, podru00edamos intentar con el siguiente gateway en una implementaciu00f3n mu00e1s completa
      };
      
      img.src = fallbackUrl;
    }
  }, [imageError, fallbacks]);
  return (
    <div 
      className={`nft-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="nft-image-container">
        <img 
          src={mediaUrl} 
          alt={nft.name} 
          className={`nft-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {            setImageError(true);            e.target.onerror = null;
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
          <Web3Button
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
            isDisabled={isClaiming} /* Eliminada la condiciu00f3n !canClaim */
            theme="dark"
            className="mint-button"
          >
            {isClaiming ? "Minting..." : "Mint NFT"}
          </Web3Button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
