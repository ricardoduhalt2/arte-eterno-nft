# NFT Minting Application - Arte Eterno

## ✅ ESTADO ACTUAL: LISTO PARA PRODUCCIÓN ✅

El proyecto ha sido actualizado y está listo para su uso en producción con las siguientes mejoras:
- Se han implementado direcciones de contrato reales y válidas para la cadena Soneium Mainnet (ID 1868).
- Se utilizan URLs de IPFS reales para las imágenes de NFTs y metadatos.
- Se ha implementado un manejo adecuado de URIs IPFS para compatibilidad con navegadores.
- Se han corregido las advertencias de accesibilidad en los componentes Dialog de Radix UI.
- Se ha optimizado el comportamiento de refetching de las queries.

**Nota:** La funcionalidad actual del proyecto está operando correctamente.

### Próximos Pasos
- Continuar mejorando la apariencia y la experiencia de usuario (look & feel) para que sea súper moderno.
- Explorar animaciones adicionales para otros elementos interactivos.

## Mejoras Recientes de UI/UX
- **Actualización de Textos Principales (Homepage - `src/App.js`)**:
    - El contenido principal de la página de inicio, incluyendo el logo, título ("NFT Boutique Marketplace"), y subtítulo ("Arte Eterno Museo de Arte Contemporaneo (MACQ)"), se gestiona directamente en `src/App.js`.
    - El texto del pie de página en `src/App.js` también se ha actualizado a "NFT Boutique Marketplace".
- **Mejoras en Tarjetas NFT (`src/components/NFTCard.js` y `src/components/NFTCard.css`)**:
    - **Efecto Hover Impactante**: Al pasar el mouse sobre una tarjeta NFT, ahora presenta un efecto de elevación y un contorno con brillo azul celeste intermitente (blinking glow). (Corrección: Se añadió la importación de CSS faltante en `NFTCard.js` para asegurar la visibilidad de estos estilos).
    - **Diseño Refinado de Tarjetas**:
        - Las tarjetas NFT son ahora un poco más pequeñas (`maxWidth: '280px'`) para un aspecto más compacto y uniforme.
        - El texto de la descripción del NFT es más pequeño (`fontSize: '0.85em'`) y ha sido estilizado para un look "super moderno" (color sutil, buena legibilidad).
        - Otros textos dentro de la tarjeta (precio, supply, botón) también se han ajustado ligeramente en tamaño para mantener la proporción.

## Características Principales
- Colección completa de 15 NFTs con contratos reales en Soneium Mainnet
- Imágenes y metadatos alojados en IPFS para descentralización completa
- Integración con ThirdWeb v5 para una experiencia de minting fluida
- Interfaz de usuario intuitiva y atractiva
- Manejo de errores robusto y fallbacks para recursos IPFS

---

## Descripción General
Esta aplicación permite a los usuarios mintear NFTs de una colección de 15 diferentes NFTs en la blockchain Soneium Mainnet. Cada NFT tiene su propio contrato y precio.

## Detalles de Implementación

### Componente NFTCard
El componente NFTCard ha sido actualizado para usar el SDK v5 de thirdweb con el componente ClaimButton. Este componente maneja automáticamente:

- Verificación de elegibilidad
- Estados de carga
- Manejo de errores
- Modal de pago
- Estado de la transacción

### Características Principales
- Mantiene todas las animaciones y el look & feel original
- Actualiza solo la lógica de minting para usar el ClaimButton de thirdweb v5
- Cada NFT tiene su propio contrato y precio
- Interfaz de usuario intuitiva y atractiva

### Estructura de Datos
Cada NFT en la colección tiene los siguientes datos:

```javascript
{
  id: 1, // Identificador único
  name: "Nombre del NFT",
  address: "0x...", // Dirección del contrato real en mainnet (única para cada NFT)
  mediaUrl: "ipfs://...", // URL de IPFS para la imagen
  fallbackUrl: "https://ipfs.io/ipfs/...", // URL de respaldo usando gateway público
  pricePerToken: 1.231, // Precio en ETH (único para cada NFT)
  claimedSupply: 0, // Cantidad ya minteada
  totalSupply: 2, // Suministro total disponible
  metadata: "ipfs://..." // Ruta de los metadatos en IPFS
}
```

## Manejo de Recursos IPFS
La aplicación implementa un sistema robusto para manejar recursos IPFS:

1. **URLs Primarias**: Todas las imágenes y metadatos utilizan URLs nativas de IPFS (`ipfs://...`)
2. **URLs de Respaldo**: Se proporcionan URLs alternativas a través de gateways públicos como respaldo
3. **Manejo de Errores**: La función `getAlternativeIpfsUrl` proporciona URLs alternativas si la carga inicial falla
4. **Múltiples Gateways**: Se utilizan varios gateways IPFS para garantizar la disponibilidad

## Instrucciones de Configuración
1. Clona este repositorio
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` con tu Client ID de ThirdWeb:
   ```
   REACT_APP_THIRDWEB_CLIENT_ID=tu-client-id-aquí
   ```
4. Inicia el servidor de desarrollo: `npm start`

## Notas Técnicas
- El componente ClaimButton de thirdweb v5 proporciona una experiencia de minting completa
- Las imágenes y metadatos están alojados en IPFS para una verdadera descentralización
- Cada NFT tiene su propia dirección de contrato real en Soneium Mainnet
- Se implementan URLs de respaldo para garantizar la disponibilidad de recursos IPFS
- La aplicación está optimizada para rendimiento y experiencia de usuario
