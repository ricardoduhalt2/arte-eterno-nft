import React, { useState, useEffect } from 'react';
import './NFTCarousel.css';

const NFTCarousel = ({ nfts }) => {
  // Estado para rastrear qué imágenes han fallado en cargar
  const [failedImages, setFailedImages] = useState({});

  // Función para obtener múltiples URLs de IPFS para intentar diferentes gateways
  const getIPFSUrls = (ipfsUri) => {
    if (!ipfsUri || typeof ipfsUri !== 'string') {
      return {
        primary: '',
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

  // Función para manejar errores de carga de imágenes
  const handleImageError = (index, elementId) => {
    // Actualizar el estado para marcar esta imagen como fallida
    setFailedImages(prev => ({
      ...prev,
      [elementId]: true
    }));
    
    // Aplicar el estilo de respaldo al elemento del carrusel
    const div = document.getElementById(elementId);
    if (div) {
      div.style.backgroundImage = getGradientBackground(index);
    }
  };

  // Función para generar un gradiente de color basado en el índice
  const getGradientBackground = (index) => {
    const gradients = [
      'linear-gradient(135deg, #9333ea, #4f46e5)',
      'linear-gradient(135deg, #8b5cf6, #6366f1)',
      'linear-gradient(135deg, #a855f7, #7c3aed)',
      'linear-gradient(135deg, #6d28d9, #5b21b6)',
      'linear-gradient(135deg, #4f46e5, #3730a3)',
      'linear-gradient(135deg, #7c3aed, #4338ca)',
      'linear-gradient(135deg, #6366f1, #4f46e5)',
      'linear-gradient(135deg, #a21caf, #7e22ce)'
    ];
    return gradients[index % gradients.length];
  };

  // Función para renderizar un elemento del carrusel
  const renderCarouselItem = (nft, index, prefix) => {
    const elementId = `${prefix}-${index}`;
    const { primary: mediaUrl, fallbacks } = getIPFSUrls(nft.mediaUri);
    
    // Determinar el estilo de fondo basado en si la imagen ha fallado
    const backgroundStyle = failedImages[elementId]
      ? { backgroundImage: getGradientBackground(index) }
      : { backgroundImage: `url(${mediaUrl}), ${getGradientBackground(index)}` };

    return (
      <div 
        id={elementId}
        key={elementId} 
        className="carousel-item" 
        style={backgroundStyle}
      >
        {/* Imagen oculta para precarga y manejo de errores */}
        <img 
          src={mediaUrl} 
          alt={nft.name || `NFT ${index + 1}`}
          style={{ display: 'none' }}
          onError={() => handleImageError(index, elementId)}
        />
        
        {/* Intentar cargar desde gateways alternativos si la imagen principal falla */}
        {failedImages[elementId] && fallbacks.map((fallbackUrl, i) => (
          <img 
            key={`fallback-${i}`}
            src={fallbackUrl}
            alt=""
            style={{ display: 'none' }}
            onLoad={() => {
              // Si una imagen de respaldo carga correctamente, actualizar el fondo
              const div = document.getElementById(elementId);
              if (div) {
                div.style.backgroundImage = `url(${fallbackUrl}), ${getGradientBackground(index)}`;
                // Actualizar el estado para marcar esta imagen como exitosa
                setFailedImages(prev => {
                  const updated = {...prev};
                  delete updated[elementId];
                  return updated;
                });
              }
            }}
          />
        ))}
        
        <div className="carousel-item-overlay">
          <span>{nft.name || `NFT ${index + 1}`}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="nft-animation-container">
      <div className="logo-animation">
        <div className="logo-pulse"></div>
        <div className="logo-text">ARTE ETERNO</div>
        <div className="logo-subtitle">MUSEO DE ARTE CONTEMPORÁNEO</div>
      </div>
      
      <div className="nft-carousel">
        {/* First set of items */}
        {nfts && nfts.length > 0 ? (
          nfts.map((nft, index) => renderCarouselItem(nft, index, 'first'))
        ) : (
          // Fallback items if no NFTs are provided
          Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={`fallback-first-${index}`} 
              className="carousel-item" 
              style={{ backgroundImage: getGradientBackground(index) }}
            >
              <div className="carousel-item-overlay">
                <span>NFT {index + 1}</span>
              </div>
            </div>
          ))
        )}
        
        {/* Duplicate set for continuous scrolling */}
        {nfts && nfts.length > 0 ? (
          nfts.map((nft, index) => renderCarouselItem(nft, index, 'second'))
        ) : (
          // Fallback items if no NFTs are provided
          Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={`fallback-second-${index}`} 
              className="carousel-item" 
              style={{ backgroundImage: getGradientBackground(index) }}
            >
              <div className="carousel-item-overlay">
                <span>NFT {index + 1}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NFTCarousel;