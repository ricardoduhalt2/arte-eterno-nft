import { IPFS_GATEWAYS, ERROR_MESSAGES } from './config';

/**
 * Utility functions for handling errors in the NFT Minting Application
 */

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
 * Maneja errores especu00edficos de contratos y proporciona mensajes u00fatiles
 * @param {Error} error - El error capturado
 * @returns {Object} Objeto con mensaje de error y sugerencia
 */
export const handleContractError = (error) => {
  const errorMessage = error.message || '';
  const errorCode = error.code || '';
  
  // Objeto para almacenar la informaciu00f3n del error
  const errorInfo = {
    message: 'Error al interactuar con el contrato',
    suggestion: 'Intenta de nuevo mu00e1s tarde o contacta al soporte.'
  };
  
  // Check if it's a ZodError related to invalid address
  if (error.name === 'ZodError' && errorMessage.includes('is not a valid address')) {
    errorInfo.message = 'La direcciu00f3n del contrato no es vu00e1lida';
    errorInfo.suggestion = 'Verifica que la direcciu00f3n del contrato sea correcta y estu00e9 en el formato adecuado.';
    return errorInfo;
  }
  
  // Check if it's a bytecode fetch error
  if (errorMessage.includes('Could not fetch bytecode for contract')) {
    errorInfo.message = 'No se pudo obtener el bytecode del contrato';
    errorInfo.suggestion = 'Verifica que el contrato exista en la red Soneium (chainId: 1868) y que tengas la configuraciu00f3n correcta del RPC.';
    return errorInfo;
  }
  
  // Errores de gas insuficiente
  if (errorMessage.includes('insufficient funds') || 
      errorMessage.includes('gas required exceeds') ||
      errorCode === 'INSUFFICIENT_FUNDS') {
    errorInfo.message = 'Fondos insuficientes para completar la transacciu00f3n';
    errorInfo.suggestion = 'Asegu00farate de tener suficiente SON en tu wallet para cubrir el costo de gas y el precio del NFT.';
    return errorInfo;
  }
  
  // Errores de rechazo de usuario
  if (errorMessage.includes('user rejected') || 
      errorCode === 'ACTION_REJECTED' ||
      errorMessage.includes('User denied')) {
    errorInfo.message = 'Transacciu00f3n rechazada';
    errorInfo.suggestion = 'Has cancelado la transacciu00f3n. Intenta de nuevo si deseas mintear el NFT.';
    return errorInfo;
  }
  
  // Errores de lu00edmite de minteo
  if (errorMessage.includes('exceed max claimable') || 
      errorMessage.includes('exceeds max')) {
    errorInfo.message = 'Has alcanzado el lu00edmite mu00e1ximo de minteo';
    errorInfo.suggestion = 'No puedes mintear mu00e1s NFTs de esta colecciu00f3n con esta wallet.';
    return errorInfo;
  }
  
  // Errores de condiciones de minteo
  if (errorMessage.includes('not active') || 
      errorMessage.includes('claim condition')) {
    errorInfo.message = 'El minteo no estu00e1 activo actualmente';
    errorInfo.suggestion = 'Verifica la fecha de inicio del minteo o contacta al creador del NFT.';
    return errorInfo;
  }
  
  // Errores de red
  if (errorMessage.includes('network') || 
      errorMessage.includes('chain') ||
      errorCode === 'NETWORK_ERROR') {
    errorInfo.message = 'Error de conexiu00f3n a la red Soneium';
    errorInfo.suggestion = 'Verifica que estu00e9s conectado a la red Soneium (ID 1868) en tu wallet.';
    return errorInfo;
  }
  
  // Errores de contrato
  if (errorMessage.includes('contract') || 
      errorMessage.includes('execution reverted')) {
    errorInfo.message = 'Error en la ejecuciu00f3n del contrato';
    errorInfo.suggestion = 'El contrato rechazu00f3 la transacciu00f3n. Puede haber un problema con el contrato NFT.';
    return errorInfo;
  }
  
  // Si no podemos identificar el error especu00edfico, devolver mensaje genu00e9rico
  errorInfo.message = `Error: ${errorMessage.slice(0, 100)}`;
  return errorInfo;
};

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
      title: 'Error de conexiu00f3n',
      message: 'No se pudo conectar con el servidor. Verifica tu conexiu00f3n a Internet.',
      severity: 'warning'
    };
  }
  
  if (error.name === 'ZodError') {
    return {
      title: 'Error de validaciu00f3n',
      message: 'Los datos proporcionados no son vu00e1lidos. Verifica la informaciu00f3n ingresada.',
      severity: 'error'
    };
  }
  
  if (error.message && error.message.includes('User rejected the request')) {
    return {
      title: 'Operaciu00f3n cancelada',
      message: 'Has cancelado la operaciu00f3n.',
      severity: 'info'
    };
  }
  
  // Default error response
  return {
    title: 'Error inesperado',
    message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo mu00e1s tarde.',
    severity: 'error'
  };
};