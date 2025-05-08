import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import NFTCard from './NFTCard';
import './NFTMarketplace.css';
import nftData from '../data/nftData';
import { isValidEthereumAddress, getAlternativeIpfsUrl, globalErrorHandler } from '../utils/errorHandler';

// Carousel component for displaying featured NFTs
const NFTCarousel = ({ nfts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  const [imageUrls, setImageUrls] = useState({});
  const featuredNfts = nfts.slice(0, 5); // Use the first 5 NFTs for the carousel

  // Initialize image URLs
  useEffect(() => {
    const initialUrls = {};
    featuredNfts.forEach(nft => {
      // Verificar si la URL es de IPFS y convertirla a una URL compatible con navegador
      if (nft.mediaUrl.startsWith('ipfs://')) {
        // Usar la función getAlternativeIpfsUrl para obtener una URL compatible
        const compatibleUrl = getAlternativeIpfsUrl(nft.mediaUrl);
        console.log(`Carousel: Convirtiendo URL IPFS a URL compatible: ${compatibleUrl}`);
        initialUrls[nft.id] = compatibleUrl;
      } else {
        initialUrls[nft.id] = nft.mediaUrl;
      }
    });
    setImageUrls(initialUrls);
  }, [featuredNfts]);

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

  // Función para manejar errores de carga de imágenes
  const handleImageError = (e, nftId) => {
    const nft = featuredNfts.find(n => n.id === nftId);
    if (!nft) return;

    // Obtener la URL original
    const originalUrl = nft.mediaUrl;
    
    // Usar la función getAlternativeIpfsUrl para obtener una URL alternativa
    const alternativeUrl = getAlternativeIpfsUrl(originalUrl);
    
    // Si la URL actual ya es la alternativa, usar el fallback
    if (imageUrls[nftId] === alternativeUrl && nft.fallbackUrl) {
      console.log(`Carousel: Usando URL de respaldo para ${nft.name}:`, nft.fallbackUrl);
      setImageUrls(prev => ({
        ...prev,
        [nftId]: nft.fallbackUrl
      }));
    } else if (imageUrls[nftId] !== alternativeUrl) {
      // Si aún no hemos probado la URL alternativa, usarla
      console.log(`Carousel: Cambiando a URL alternativa para ${nft.name}:`, alternativeUrl);
      setImageUrls(prev => ({
        ...prev,
        [nftId]: alternativeUrl
      }));
    } else {
      // Si todo falla, usar un placeholder
      console.log(`Carousel: Usando placeholder para ${nft.name}`);
      e.target.src = "https://placehold.co/400x400/222/fff?text=Image+Not+Available";
      e.target.onerror = null; // Prevenir bucle infinito
    }
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
            <img 
              src={imageUrls[nft.id] || nft.mediaUrl} 
              alt={nft.name} 
              onError={(e) => handleImageError(e, nft.id)}
            />
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

  // Usamos los datos de nftData.js que ya tienen las direcciones y URLs corregidas
  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        setLoading(true);
        
        // Validar las direcciones de los contratos
        const validatedNfts = nftData.map(nft => {
          const isValid = isValidEthereumAddress(nft.address);
          return {
            ...nft,
            isValidAddress: isValid
          };
        });

        setNfts(validatedNfts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching NFT data:", err);
        const errorInfo = globalErrorHandler(err);
        setError(errorInfo.message);
        setLoading(false);
      }
    };

    fetchNFTData();
  }, [address]);

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

export default NFTMarketplace;