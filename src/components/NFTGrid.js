import React from 'react';
import NFTCard from './NFTCard';
import nftData from '../data/nftData';
import './NFTGrid.css';

const NFTGrid = () => {
  return (
    <div className="nft-grid">
      {nftData.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NFTGrid;