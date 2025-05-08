import React, { useState, useEffect } from 'react';
import { useContract } from '@thirdweb-dev/react';
import ErrorHandler from '../components/ErrorHandler';
import { handleContractError, getAlternativeIpfsUrl } from '../utils/errorHandler';

/**
 * Example component demonstrating error handling with Thirdweb contracts
 */
const ContractExample = ({ contractAddress, chainId = 1868 }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [nfts, setNfts] = useState([]);
  
  // Use the Thirdweb hook to get the contract
  const { contract, isLoading, isError } = useContract(contractAddress);
  
  // Function to load NFTs from the contract
  const loadNFTs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!contract) throw new Error('Contrato no disponible');
      
      // Get contract metadata
      const meta = await contract.metadata.get();
      setMetadata(meta);
      
      // Get NFTs - handle with try/catch for better error handling
      try {
        const allNfts = await contract.erc721.getAll();
        
        // Process NFTs and handle IPFS URLs
        const processedNfts = allNfts.map(nft => ({
          ...nft,
          // Replace IPFS URLs with alternatives if needed
          image: nft.metadata.image.startsWith('ipfs://') 
            ? getAlternativeIpfsUrl(nft.metadata.image.replace('ipfs://', 'ipfs/')) 
            : nft.metadata.image
        }));
        
        setNfts(processedNfts);
      } catch (nftError) {
        console.warn('Error loading NFTs:', nftError);
        // Continue with the app even if NFTs fail to load
        setNfts([]);
      }
    } catch (err) {
      console.error('Error in loadNFTs:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Load NFTs when the contract is ready
  useEffect(() => {
    if (!isLoading && contract && !isError) {
      loadNFTs();
    }
  }, [contract, isLoading, isError]);
  
  // Handle contract loading error
  useEffect(() => {
    if (isError) {
      setError(new Error('Error al cargar el contrato'));
      setLoading(false);
    }
  }, [isError]);
  
  // If there's an error, show the error handler component
  if (error) {
    return <ErrorHandler error={error} onRetry={loadNFTs} showDetails={process.env.NODE_ENV === 'development'} />;
  }
  
  // Show loading state
  if (loading || isLoading) {
    return <div>Cargando datos del contrato...</div>;
  }
  
  // Render the contract data
  return (
    <div className="contract-container">
      {metadata && (
        <div className="contract-metadata">
          <h2>{metadata.name}</h2>
          <p>{metadata.description}</p>
        </div>
      )}
      
      <div className="nft-grid">
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div key={nft.metadata.id} className="nft-card">
              <img 
                src={nft.image} 
                alt={nft.metadata.name} 
                onError={(e) => {
                  // If image fails to load, try an alternative IPFS gateway
                  e.target.src = getAlternativeIpfsUrl(nft.metadata.image);
                }}
              />
              <h3>{nft.metadata.name}</h3>
            </div>
          ))
        ) : (
          <p>No se encontraron NFTs en este contrato.</p>
        )}
      </div>
    </div>
  );
};

export default ContractExample;