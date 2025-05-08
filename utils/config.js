/**
 * Configuración global para la aplicación NFT Minting
 */

// Lista de gateways IPFS para usar como alternativas
export const IPFS_GATEWAYS = [
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://dweb.link/ipfs/',
  'https://ipfs.infura.io/ipfs/'
];

// Configuración de la cadena Soneium
export const SONEIUM_CONFIG = {
  chainId: 1868,
  name: "Soneium",
  currency: {
    name: "Soneium",
    symbol: "SON",
    decimals: 18
  },
  rpcUrl: process.env.REACT_APP_SONEIUM_RPC_URL || "https://1868.rpc.thirdweb.com"
};

// Configuración de reintentos para solicitudes fallidas
export const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 segundo
  maxDelay: 5000 // 5 segundos
};

// Configuración de timeouts para solicitudes
export const TIMEOUT_CONFIG = {
  fetchTimeout: 10000, // 10 segundos
  contractCallTimeout: 30000 // 30 segundos
};

// Mensajes de error personalizados
export const ERROR_MESSAGES = {
  ipfsError: "No se pudo cargar el recurso desde IPFS. Intentando con gateway alternativo...",
  contractError: "Error al interactuar con el contrato. Por favor, intenta de nuevo más tarde.",
  networkError: "Error de conexión a la red. Verifica tu conexión a Internet.",
  walletError: "Error al conectar con la wallet. Asegúrate de que tu wallet esté configurada correctamente.",
  mintError: "Error al mintear el NFT. Verifica que tengas suficiente balance y que el contrato esté activo."
};