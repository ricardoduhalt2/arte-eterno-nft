# Guía de Solución de Problemas - NFT Minting Application

Esta guía proporciona soluciones para los problemas comunes identificados en la aplicación NFT Minting.

## 1. Errores de validación de Zod y direcciones de contrato inválidas

### Problema
Errores como `ZodError: [address] is not a valid address` indican problemas con la validación de direcciones Ethereum.

### Solución
- Verifica que todas las direcciones de contrato en `NFTMarketplace.js` sean válidas para la cadena Soneium (ID 1868).
- Las direcciones Ethereum deben tener 42 caracteres (incluyendo '0x') y contener solo caracteres hexadecimales.
- Ejemplo de dirección válida: `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`

### Implementación
Se ha añadido una función de validación de direcciones en `utils/errorHandler.js` que verifica automáticamente el formato de las direcciones.

## 2. Fallos en la obtención de metadatos de contratos

### Problema
Errores como `Could not fetch bytecode for contract at [address] on chain 1868` o errores HTTP 400 al intentar obtener metadatos de contratos.

### Solución
- Verifica que los contratos existan en la red Soneium (chainId 1868).
- Comprueba que el RPC URL en tu archivo `.env` sea correcto.
- Asegúrate de que tu Client ID de Thirdweb tenga permisos para acceder a estos contratos.

### Implementación
Se ha mejorado el manejo de errores para proporcionar mensajes más claros cuando ocurren estos problemas.

## 3. Errores de esquema URI de IPFS

### Problema
Errores como `net::ERR_UNKNOWN_URL_SCHEME` al intentar cargar recursos IPFS directamente.

### Solución
- Las URIs `ipfs://` no son compatibles directamente con navegadores y deben convertirse a URLs HTTP.
- Se deben usar gateways IPFS públicos para acceder a estos recursos.

### Implementación
- Se ha creado un módulo `utils/ipfsUtils.js` que convierte automáticamente las URIs IPFS a URLs HTTP.
- Se utilizan múltiples gateways IPFS alternativos para mayor confiabilidad.
- Se ha implementado un sistema de fallback que intenta diferentes gateways si uno falla.

## 4. Advertencias de accesibilidad en componentes Dialog

### Problema
Advertencias relacionadas con la falta de props `DialogTitle` y `Description` en los componentes Dialog de Radix UI.

### Solución
- Añadir los props requeridos a todos los componentes Dialog.

### Implementación
Este problema no se ha abordado en esta actualización ya que no se encontraron componentes Dialog en el código proporcionado.

## 5. Refetching de queries al enfocar la ventana

### Problema
Las queries se vuelven a ejecutar cuando la ventana recupera el foco, causando errores repetidos.

### Solución
- Configurar las opciones de refetching en los hooks de React Query o Thirdweb.

### Implementación
Este problema se abordará en una actualización futura.

## Configuración del entorno

Asegúrate de que tu archivo `.env` contenga las siguientes variables:

```
REACT_APP_THIRDWEB_CLIENT_ID=tu-client-id-aquí
REACT_APP_SONEIUM_RPC_URL=https://1868.rpc.thirdweb.com/tu-client-id-aquí
```

## Verificación de la red

Para verificar que puedes conectarte correctamente a la red Soneium, puedes ejecutar el siguiente comando:

```bash
curl -X POST https://1868.rpc.thirdweb.com/tu-client-id-aquí \
-H "Content-Type: application/json" \
--data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

Deberías recibir una respuesta con el número de bloque actual.

## Contacto para soporte adicional

Si continúas experimentando problemas después de intentar estas soluciones, contacta al mantenedor del proyecto a través de GitHub o por correo electrónico a ricardoduhalt2@gmail.com.