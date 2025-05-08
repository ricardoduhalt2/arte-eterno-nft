/**
 * Utility functions for handling common errors in the Arte Eterno NFT marketplace
 */

/**
 * Handles IPFS resource loading errors by providing alternative gateways
 * @param {string} ipfsUrl - The original IPFS URL that failed to load
 * @returns {string} An alternative IPFS gateway URL
 */
export const getAlternativeIpfsUrl = (ipfsUrl) => {
  // Handle ipfs:// protocol URLs
  if (ipfsUrl.startsWith('ipfs://')) {
    const cid = ipfsUrl.replace('ipfs://', '');
    const path = cid.includes('/') ? cid.substring(cid.indexOf('/') + 1) : '';
    const cleanCid = cid.includes('/') ? cid.substring(0, cid.indexOf('/')) : cid;
    
    // Return a reliable gateway URL
    return `https://cloudflare-ipfs.com/ipfs/${cleanCid}${path ? '/' + path : ''}`;
  }
  
  // Extract the CID and path from the original URL for http/https URLs
  const ipfsPattern = /ipfs\/([a-zA-Z0-9]+)(?:\/(.*))?/;
  const matches = ipfsUrl.match(ipfsPattern);
  
  if (!matches) return ipfsUrl; // Return original if pattern doesn't match
  
  const cid = matches[1];
  const path = matches[2] || '';
  
  // List of alternative IPFS gateways
  const gateways = [
    `https://cloudflare-ipfs.com/ipfs/${cid}${path ? '/' + path : ''}`,
    `https://ipfs.io/ipfs/${cid}${path ? '/' + path : ''}`,
    `https://gateway.pinata.cloud/ipfs/${cid}${path ? '/' + path : ''}`,
    `https://dweb.link/ipfs/${cid}${path ? '/' + path : ''}`,
    `https://ipfs.fleek.co/ipfs/${cid}${path ? '/' + path : ''}`,
  ];
  
  // Return the first gateway URL as default
  return gateways[0];
};

/**
 * Validates an Ethereum address
 * @param {string} address - The Ethereum address to validate
 * @returns {boolean} Whether the address is valid
 */
export const isValidEthereumAddress = (address) => {
  // Check if it's a string and has the correct length (42 characters including '0x')
  if (typeof address !== 'string' || address.length !== 42) return false;
  
  // Check if it starts with '0x'
  if (!address.startsWith('0x')) return false;
  
  // Check if it contains only hexadecimal characters after '0x'
  const hexRegex = /^0x[0-9a-fA-F]{40}$/;
  return hexRegex.test(address);
};

/**
 * Handles contract-related errors
 * @param {Error} error - The error object
 * @returns {Object} A user-friendly error message and suggested action
 */
export const handleContractError = (error) => {
  // Check if it's a ZodError related to invalid address
  if (error.name === 'ZodError' && error.message.includes('is not a valid address')) {
    return {
      message: 'La dirección del contrato no es válida',
      suggestion: 'Verifica que la dirección del contrato sea correcta y esté en el formato adecuado.'
    };
  }
  
  // Check if it's a bytecode fetch error
  if (error.message && error.message.includes('Could not fetch bytecode for contract')) {
    return {
      message: 'No se pudo obtener el bytecode del contrato',
      suggestion: 'Verifica que el contrato exista en la red Soneium (chainId: 1868) y que tengas la configuración correcta del RPC.'
    };
  }
  
  // Default error handling
  return {
    message: 'Error al interactuar con el contrato',
    suggestion: 'Intenta de nuevo más tarde o contacta al soporte si el problema persiste.'
  };
};

/**
 * Simple utility to resolve ipfs:// URI to a specific HTTP gateway (ipfs.io).
 * @param {string} ipfsUri - The IPFS URI (e.g., "ipfs://CID/path").
 * @returns {string} The HTTP gateway URL.
 */
export function ipfsToHttp(ipfsUri) {
  if (typeof ipfsUri === 'string' && ipfsUri.startsWith('ipfs://')) {
    return ipfsUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  // Return original if not a valid ipfs:// URI string
  return ipfsUri; 
}

/**
 * Global error handler for the application
 * @param {Error} error - The error object
 * @param {Function} logError - Function to log the error (e.g., to a service)
 * @returns {Object} User-friendly error information
 */
export const globalErrorHandler = (error, logError = console.error) => {
  // Log the original error
  logError('Error original:', error);
  
  // Handle different types of errors
  if (error.message && error.message.includes('Failed to fetch')) {
    return {
      title: 'Error de conexión',
      message: 'No se pudo conectar con el servidor. Verifica tu conexión a Internet.',
      severity: 'warning'
    };
  }
  
  if (error.name === 'ZodError') {
    return {
      title: 'Error de validación',
      message: 'Los datos proporcionados no son válidos. Verifica la información ingresada.',
      severity: 'error'
    };
  }
  
  if (error.message && error.message.includes('User rejected the request')) {
    return {
      title: 'Operación cancelada',
      message: 'Has cancelado la operación.',
      severity: 'info'
    };
  }
  
  // Default error response
  return {
    title: 'Error inesperado',
    message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
    severity: 'error'
  };
};
