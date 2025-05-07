import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import NFTCard from './NFTCard';
import './NFTMarketplace.css';

// Carousel component for displaying featured NFTs
const NFTCarousel = ({ nfts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  const featuredNfts = nfts.slice(0, 5); // Use the first 5 NFTs for the carousel

  const goToSlide = useCallback((index) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = featuredNfts.length - 1;
    } else if (newIndex >= featuredNfts.length) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
  }, [featuredNfts.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, nextSlide]);

  const handleMouseEnter = () => {
    setAutoplay(false);
  };

  const handleMouseLeave = () => {
    setAutoplay(true);
  };

  if (!featuredNfts.length) return null;

  return (
    <div 
      className="carousel-container" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredNfts.map((nft, index) => (
          <div key={index} className="carousel-slide">
            <img src={nft.mediaUrl} alt={nft.name} />
            <div className="carousel-info">
              <h3>{nft.name}</h3>
              <p>Price: {nft.pricePerToken} ETH</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-arrow prev" onClick={prevSlide}>
        &#10094;
      </div>
      <div className="carousel-arrow next" onClick={nextSlide}>
        &#10095;
      </div>

      <div className="carousel-nav">
        {featuredNfts.map((_, index) => (
          <div 
            key={index} 
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Main NFT Marketplace component
const NFTMarketplace = () => {
  const address = useAddress();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NFT Collection data
  const NFTS = [
    { name: "Tides of the Eternal Mind", address: "0xfb31Aa293a6974C44F1F283A2d2e1e656b08fc1E", tokenUri: "ipfs://QmWKkx4b8QVz7Vo3Ncjy3as5gW5c4JffNmAohZD3Zyu9Ax/0", mediaUri: "ipfs://QmfW2F29peaJPKCxYLEjMkFRbeEcRDa3MUFyqoTkjTAYqf/0.jpg", pricePerToken: "1" },
    { name: "Galactic Clean-Up Crew", address: "0x82319a7FeDf4E3ba6F8Ee5C07d88191E9c7d1FC4", tokenUri: "ipfs://QmUz8psaEAB4MzoM4x9uMW7KsZegtrsbjQa3uamN53PsTG/0", mediaUri: "ipfs://QmNcTwgWp3rMW3RxSbeKArNHiSpA3qZmMYv61m7LKHj4N7/0.jpg", pricePerToken: "1" },
    { name: "C0mMzoVeRLoAD", address: "0x1A59A9e2AaD38229789689D01615Cc50DcfAAc94", tokenUri: "ipfs://QmfG95HGV782dYZbKfrgsLtVSaehE3s5FopPGA1fwkMCvE/0", mediaUri: "ipfs://QmYpogwdFMRonvU7p26S8JeUcU46TFk6aTBhGyyUEAX8E3/0.jpg", pricePerToken: "1" },
    { name: "Entre la Vida y el Plástico", address: "0xD71e518BeA282eA53259A06d3529813A1BC20FcF", tokenUri: "ipfs://QmX2u3SngrPeQHHhUVDomyn68q6HYZrsKaqaxNEV2wYzB1/0", mediaUri: "ipfs://Qmant6X4GE4o7bMDuYDCyGr3wRwUpTejAzBjgDJucWR6H5/0.jpg", pricePerToken: "1" },
    { name: "Bit-Beats Bliss", address: "0x36fcAa369FC94ab630A6034860d0307a55073FF3", tokenUri: "ipfs://QmTByARGCMw7HKnqbDiDp44aUs48wf9HmAfEC92NJpb5qk/0", mediaUri: "ipfs://QmV7oRsZvLCW7hjapbYZeSW9FvarxwqStAwrUNEYUXzzjV/0.gif", pricePerToken: "1" },
    { name: "I vow to take care of you", address: "0xFAd250Cb1A4928aa48183DC18F8F5278161E56e7", tokenUri: "ipfs://QmXwLjqSs924dNRCqcC2MUYgzgeyu5Sd9w6QYAGCHqTD6E/0", mediaUri: "ipfs://QmUDnTLzEhtf1eLT8GSnwVeehRk8sNzhSaHkNqhMe62tMW/0.jpg", pricePerToken: "1" },
    { name: "Yo Soy Libertad", address: "0x38e0b194108a4598Baa174EfAE19827924A72E6C", tokenUri: "ipfs://QmULgWid9nBdCQqhU4oVRnBdvypvY6LPJGtwcvn7jxdJjS/0", mediaUri: "ipfs://QmVuTVZRZXoqx67LDtz96YQqcjSaLmYq9rPiMi1SHw3H2S/0.jpg", pricePerToken: "1" },
    { name: "Pirolisaurio: Born from the Fossil Age", address: "0x98b2a0BcE4892139D13f1545931Be9EC9C7EC962", tokenUri: "ipfs://QmUP9bz9UXec1kLc7HHNE6h241Vj4h5tQf3wFtiAspzEVY/0", mediaUri: "ipfs://QmRJ6B6FHAH8rvuyvRDFZFnT8btdfniDJpBpiNnPwXK1Mm/0.jpg", pricePerToken: "1" },
    { name: "Petgaserito Laser Luca", address: "0xb473416dF4b7f24eE5DB710fE9265aAc190EaEe3", tokenUri: "ipfs://QmS8CaNrP16URtfXVT5FmABhXKiXXEB54FUmWagbRjHZz9/0", mediaUri: "ipfs://QmcxLvSAnCXH3DBiYm6ipTto2PWHxJuzadpJDAyUZ32Zr7/0.jpg", pricePerToken: "1" },
    { name: "MOON LANDING", address: "0x25817f14c788adbFE5366d0B5b765B1028FAE4db", tokenUri: "ipfs://QmaQjSPR41fc9HAX39evKCBoihcfiy44xqgmgPdXsu84gR/0", mediaUri: "ipfs://QmXv8gZSdatxAEfmFfuLEM33cnoPt8PquWjVepT4nVJQhd/0.jpeg", pricePerToken: "1" },
    { name: "Hydrothermal Camouflage", address: "0x9542a461c587b6D840f1b217c2C37731FeC4A6BD", tokenUri: "ipfs://QmP3B6j32Y6PMyFfZYZhMtBa7NoAofMCsPSxy6xapouWt7/0", mediaUri: "ipfs://QmQbTPd3SpWbyxN2so1xamFMKXNZiD6UC4omZRrp7ymm5T/0.jpg", pricePerToken: "1" },
    { name: "Floral Coral", address: "0x0F7d59440a2D30559f2570F82583C394229D18e1", tokenUri: "ipfs://QmNrqTkfnbXc3AxmV4vkc7aXgp2Qe5xURtTDQpEYCE81hD/0", mediaUri: "ipfs://QmTEdDpohzRWcpmZdMEGjb58bqs1YpgXR77TyASD7Ty1Ky/0.jpg", pricePerToken: "1" },
    { name: "Snail Whale", address: "0xE8f91499D385Ab800555ADcf6c6B3110137B4dBB", tokenUri: "ipfs://QmUtBMz4KrtfL6j7FR8Qzx37yDCKVjMBrz6b11ucG6kY9P/0", mediaUri: "ipfs://QmTyR1C41vBLDRxr4sqgpPSWQBFzFcmofAqpHQtXYuxcsu/0.JPG", pricePerToken: "1" },
    { name: "regenAIssance (i.)", address: "0x36dB4CaB8d3C5935334c8f7220e512C2E6188863", tokenUri: "ipfs://QmdW2DvG3rfZVQL58pvp1W1buLNBep1WqCiWTVLktsgCvW/0", mediaUri: "ipfs://QmWj76x9aEPoeHHYjSKRoSvagbHbhFHf6bLrJsftixqfMH/0.jpg", pricePerToken: "1" },
    { name: "Treegeneration", address: "0x70Eb14A48a994f68C6eae0eA4bA4E3264f2a9A88", tokenUri: "ipfs://QmbbV6LPgY2U4K15BoqFx4udioNNRb8r9spPE93SfJUj19/0", mediaUri: "ipfs://QmQBj5qjjBqEn9TC2xmADMdm6Quk4AFfbwPUPnnE3FC81w/0.jpg", pricePerToken: "1" }
  ];

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const fetchNFTData = async () => {
      try {
        setLoading(true);
        // Process NFT data with additional contract info
        const processedNfts = NFTS.map(nft => {
          // Convert IPFS URLs to HTTP URLs
          const mediaUrl = nft.mediaUri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
          const tokenUrl = nft.tokenUri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');

          return {
            ...nft,
            mediaUrl,
            tokenUrl
          };
        });

        setNfts(processedNfts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching NFT data:", err);
        setError("Failed to load NFT data. Please try again later.");
        setLoading(false);
      }
    };

    fetchNFTData();
  }, [address]);  // Removed NFTS from dependencies as it's defined in the component and doesn't change

  if (!address) {
    return (
      <div className="marketplace-container">
        <div className="connect-prompt">
          <h2>WELCOME TO THE ARTE ETERNO DIGITAL GALLERY!</h2>
          <p>Connect your wallet to acquire these exclusive works and join our collector community</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="marketplace-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading NFT collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="marketplace-container">
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>Arte Eterno Collection</h2>
        <p>Mint your favorite NFTs from this curated collection</p>
      </div>

      {/* NFT Carousel */}
      <NFTCarousel nfts={nfts} />

      <div className="nft-grid">
        {nfts.map((nft, index) => (
          <NFTCard key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;
        {nfts.map((nft, index) => (
          <NFTCard key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;