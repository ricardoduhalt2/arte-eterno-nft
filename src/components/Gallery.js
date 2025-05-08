import React from 'react';
import { ConnectButton } from "thirdweb/react"; // Ensure this path is correct for v5
import { client, soneium } from '../config/thirdwebClient';
import DROPS from '../data/nftData'; // Assuming nftData.js now exports DROPS
import NFTCard from './NFTCard';

export default function Gallery() {
  return (
    <React.Fragment>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <ConnectButton
          client={client}
          chain={soneium}
          // theme={"dark"} // Optional: if you want to set a theme
          // connectModal={{ size: "wide" }} // Optional: modal customization
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', padding: '0 20px 20px 20px' }}>
        {DROPS.map(nft => (
          <NFTCard
            key={nft.contract} // React key
            contract={nft.contract}
            tokenId={nft.tokenId}
            // name={nft.name} // NFTName component inside NFTCard will handle name
            // tokenURI={nft.tokenURI} // NFTProvider handles this via contract & tokenId
            claimPrice={nft.claimPrice}
            supply={nft.supply}
            supplyClaimed={nft.supplyClaimed}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
