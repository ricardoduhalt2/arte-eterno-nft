import React from 'react';
import NFTCarousel from './NFTCarousel';
import './WelcomePage.css';

const WelcomePage = ({ nfts }) => {
  // Preparar los datos de NFTs para el carrusel
  const carouselNfts = nfts ? nfts.map(nft => ({
    ...nft,
    mediaUri: nft.mediaUri // Mantener el formato ipfs:// para que NFTCarousel lo procese
  })) : [];

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Arte Eterno Collection</h1>
        <p>Discover and collect unique digital art pieces from the Arte Eterno collection</p>
      </div>
      
      <div className="connect-prompt">
        <h2>¡Bienvenido a la Galería Digital de Arte Eterno!</h2>
        <p>Conecta tu wallet para adquirir estas obras exclusivas y formar parte de nuestra comunidad de coleccionistas</p>
        
        {/* Reemplazar SimpleCarousel con NFTCarousel */}
        <NFTCarousel nfts={carouselNfts} />
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3 className="feature-title">Unique Digital Art</h3>
          <p className="feature-description">Each piece in our collection is a unique digital artwork with verified authenticity on the blockchain.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-title">Secure Ownership</h3>
          <p className="feature-description">Your NFTs are securely stored on the blockchain, giving you true ownership of your digital assets.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3 className="feature-title">Global Community</h3>
          <p className="feature-description">Join a worldwide community of collectors and artists passionate about digital art and NFTs.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;