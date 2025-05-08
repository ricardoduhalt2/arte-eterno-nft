import React from 'react';
import { ThirdwebProvider } from "thirdweb/react"; // Import ThirdwebProvider for v5
import { client } from './config/thirdwebClient'; // Import the client
import Gallery from './components/Gallery'; // Import the new Gallery component
import './App.css';

// The soneiumChain definition is removed as the new components use the centralized one from src/config/thirdwebClient.js
// The Thirdweb client is initialized within components or imported from a central config for v5.

function App() {
  return (
    // The old ThirdwebProvider is removed.
    // If a global v5 provider is needed, it would be from "thirdweb/react".
    // However, the new components (ConnectButton, ClaimButton, NFTProvider) are passed client/contract directly.
    // Wrap Gallery with ThirdwebProvider
    <ThirdwebProvider>
      <div className="App">
        <header className="App-header">
          <img src="https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png" alt="Unlockable Content Agency Logo" style={{ /* Consider adding some basic styling if needed, e.g., height or width */ }} />
          <h1>NFT Boutique Marketplace</h1>
          <p>Arte Eterno Museo de Arte Contemporaneo (MACQ)</p>
        </header>
      <main>
        <Gallery /> {/* Use the new Gallery component */}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} NFT Boutique Marketplace. All rights reserved.</p>
      </footer>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
