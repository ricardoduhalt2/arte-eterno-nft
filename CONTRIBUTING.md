# Contribuyendo al proyecto Arte Eterno

¡Gracias por tu interés en contribuir al proyecto Arte Eterno! Este documento proporciona pautas para contribuir al desarrollo del marketplace de NFTs.

## Configuración del entorno de desarrollo

1. Clona el repositorio:
   ```
   git clone https://github.com/ricardoduhalt2/arte-eterno-nft.git
   cd arte-eterno-nft
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en el directorio raíz con las siguientes variables:
   ```
   REACT_APP_THIRDWEB_CLIENT_ID=a37f843ccef648163abc82ab025e7cf7
   REACT_APP_SONEIUM_RPC_URL=https://1868.rpc.thirdweb.com/a37f843ccef648163abc82ab025e7cf7
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm start
   ```

## Flujo de trabajo para contribuciones

1. Crea una nueva rama para tu característica o corrección:
   ```
   git checkout -b feature/nombre-de-la-caracteristica
   ```
   o
   ```
   git checkout -b fix/nombre-del-problema
   ```

2. Realiza tus cambios y asegúrate de que el código sigue las convenciones del proyecto.

3. Prueba tus cambios localmente.

4. Haz commit de tus cambios con mensajes descriptivos:
   ```
   git commit -m "Añade: descripción de la nueva característica"
   ```
   o
   ```
   git commit -m "Corrige: descripción del problema solucionado"
   ```

5. Sube tus cambios a GitHub:
   ```
   git push origin feature/nombre-de-la-caracteristica
   ```

6. Crea un Pull Request en GitHub.

## Convenciones de código

- Utiliza nombres descriptivos para variables y funciones.
- Escribe comentarios para explicar el código complejo.
- Sigue las convenciones de estilo de React y JavaScript moderno.
- Utiliza componentes funcionales y hooks de React.

## Pruebas

Asegúrate de probar tus cambios en diferentes navegadores y dispositivos antes de enviar un Pull Request.

## Informar problemas

Si encuentras un problema, por favor crea un issue en GitHub con la siguiente información:

- Descripción detallada del problema
- Pasos para reproducir el problema
- Comportamiento esperado vs. comportamiento actual
- Capturas de pantalla (si es aplicable)
- Información del entorno (navegador, sistema operativo, etc.)

## Contacto

Si tienes preguntas o necesitas ayuda, puedes contactar al mantenedor del proyecto a través de GitHub o por correo electrónico a ricardoduhalt2@gmail.com.