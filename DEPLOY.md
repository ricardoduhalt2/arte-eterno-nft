# Despliegue en Vercel

Este documento proporciona instrucciones para desplegar el proyecto "Arte Eterno: Museo de Arte Contemporáneo (MACQ)" en Vercel.

## Requisitos previos

- Una cuenta en [Vercel](https://vercel.com)
- El proyecto debe estar en un repositorio de GitHub

## Pasos para el despliegue

1. Ve a [Vercel](https://vercel.com/import/git)
2. Inicia sesión o crea una cuenta si no tienes una
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `arte-eterno-nft`
5. Vercel detectará automáticamente que es un proyecto de React
6. En la configuración del proyecto:
   - Asegúrate de que el directorio raíz esté configurado como `/`
   - El comando de construcción debe ser `npm run build`
   - El directorio de salida debe ser `build`
7. Haz clic en "Deploy" para iniciar el despliegue

## Configuración de variables de entorno

Asegúrate de configurar las siguientes variables de entorno en Vercel:

```
REACT_APP_THIRDWEB_CLIENT_ID=a37f843ccef648163abc82ab025e7cf7
REACT_APP_SONEIUM_RPC_URL=https://1868.rpc.thirdweb.com/a37f843ccef648163abc82ab025e7cf7
```

## Después del despliegue

- Vercel te proporcionará una URL donde tu aplicación está desplegada
- Puedes configurar un dominio personalizado en la configuración del proyecto en Vercel si lo deseas

## Solución de problemas comunes

### Error de construcción relacionado con dependencias

Si encuentras errores relacionados con dependencias durante la construcción, asegúrate de que el archivo `.npmrc` esté presente en tu repositorio con el siguiente contenido:

```
legacy-peer-deps=true
node-linker=hoisted
```

### Problemas con rutas de navegación

Si hay problemas con las rutas de navegación después del despliegue, verifica que el archivo `vercel.json` esté configurado correctamente para manejar las rutas de una aplicación de página única (SPA).

## Actualizaciones futuras

Para actualizar la aplicación desplegada, simplemente haz push de los cambios a la rama principal de tu repositorio de GitHub. Vercel detectará automáticamente los cambios y volverá a desplegar la aplicación.