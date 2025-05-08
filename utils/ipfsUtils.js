import { IPFS_GATEWAYS } from './config';

/**
 * Convierte una URI de IPFS a una URL HTTP utilizando gateways alternativos
 * @param {string} ipfsUri - La URI de IPFS (puede ser ipfs:// o ya un CID)
 * @returns {string} URL HTTP para acceder al recurso IPFS
 */
export const ipfsToHttp = (ipfsUri) => {
  if (!ipfsUri || typeof ipfsUri !== 'string') {
    return '';
  }

  // Si la URL ya es una URL HTTP completa, usarla directamente
  if (ipfsUri.startsWith('http')) {
    return ipfsUri;
  }

  // Extraer el CID (Content Identifier) de la URI de IPFS
  const cid = ipfsUri.replace('ipfs://', '');
  
  // Usar los gateways de la configuraciu00f3n
  const gateways = IPFS_GATEWAYS.map(gateway => `${gateway}${cid}`);
  
  // Devolver un gateway aleatorio para distribuir la carga
  return gateways[Math.floor(Math.random() * gateways.length)];
};

/**
 * Precargar una imagen desde una URI de IPFS
 * @param {string} ipfsUri - La URI de IPFS de la imagen
 * @returns {Promise<string>} URL que funcionu00f3 para cargar la imagen
 */
export const preloadIpfsImage = async (ipfsUri) => {
  if (!ipfsUri) return '';
  
  // Convertir a HTTP
  const primaryUrl = ipfsToHttp(ipfsUri);
  
  // Intentar cargar la imagen
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = primaryUrl;
    });
    return primaryUrl; // Si carga correctamente, devolver la URL principal
  } catch (error) {
    // Si falla, intentar con otros gateways
    for (const gateway of IPFS_GATEWAYS) {
      const cid = ipfsUri.replace('ipfs://', '');
      const alternativeUrl = `${gateway}${cid}`;
      
      if (alternativeUrl === primaryUrl) continue; // Saltar si es la misma URL que ya fallu00f3
      
      try {
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = alternativeUrl;
        });
        return alternativeUrl; // Si carga correctamente, devolver esta URL
      } catch {
        continue; // Intentar con el siguiente gateway
      }
    }
    
    // Si todos los gateways fallan, devolver la URL original
    return primaryUrl;
  }
};

/**
 * Verifica si una URI es una URI de IPFS vu00e1lida
 * @param {string} uri - La URI a verificar
 * @returns {boolean} True si es una URI de IPFS vu00e1lida
 */
export const isValidIpfsUri = (uri) => {
  if (!uri || typeof uri !== 'string') return false;
  
  // Verificar si comienza con ipfs://
  if (uri.startsWith('ipfs://')) return true;
  
  // Verificar si es un CID vu00e1lido (simplificado)
  const cidRegex = /^[a-zA-Z0-9]{46,59}$/;
  return cidRegex.test(uri);
};