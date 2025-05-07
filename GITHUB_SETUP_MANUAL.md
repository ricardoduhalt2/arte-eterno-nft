# Configuraciu00f3n manual de GitHub

Este documento proporciona instrucciones paso a paso para crear un repositorio en GitHub y subir tu cu00f3digo manualmente.

## Opciu00f3n 1: Crear el repositorio manualmente en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesiu00f3n con tu cuenta.

2. Haz clic en el botu00f3n "+" en la esquina superior derecha y selecciona "New repository".

3. Configura el repositorio:
   - Nombre del repositorio: `arte-eterno-nft`
   - Descripciu00f3n: "Marketplace de NFTs Arte Eterno"
   - Visibilidad: Pu00fablico
   - No inicialices el repositorio con archivos README, .gitignore o licencia

4. Haz clic en "Create repository".

5. GitHub te mostraru00e1 instrucciones para subir un repositorio existente. Sigue las instrucciones para "...or push an existing repository from the command line":

   ```bash
   git remote add origin https://github.com/ricardoduhalt2/arte-eterno-nft.git
   git branch -M main
   git push -u origin main
   ```

## Opciu00f3n 2: Usar el script proporcionado

Hemos creado varios scripts para ayudarte a configurar el repositorio. Elige uno de los siguientes:

### Si tienes GitHub CLI instalado:

1. Asegu00farate de estar autenticado en GitHub CLI:
   ```bash
   gh auth login
   ```

2. Ejecuta el script:
   ```bash
   chmod +x create-repo-gh-cli.sh
   ./create-repo-gh-cli.sh
   ```

### Si no tienes GitHub CLI:

1. Crea el repositorio manualmente en GitHub como se describe en la Opciu00f3n 1.

2. Ejecuta el script para configurar el repositorio remoto y subir el cu00f3digo:
   ```bash
   chmod +x push-to-github.sh
   ./push-to-github.sh
   ```

### Si prefieres usar la API de GitHub:

1. Crea un token de acceso personal en GitHub:
   - Ve a [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Haz clic en "Generate new token"
   - Asigna un nombre descriptivo y selecciona el alcance "repo"
   - Haz clic en "Generate token" y copia el token generado

2. Ejecuta el script:
   ```bash
   chmod +x create-repo.sh
   ./create-repo.sh
   ```
   - Cuando se te solicite, pega el token de acceso personal que generaste

## Verificaciu00f3n

Despuu00e9s de seguir cualquiera de estas opciones, verifica que tu repositorio se haya creado correctamente visitando:

```
https://github.com/ricardoduhalt2/arte-eterno-nft
```

## Soluciu00f3n de problemas

### Error 404 al visitar el repositorio

Si recibes un error 404 al visitar la URL del repositorio, verifica lo siguiente:

1. Asegu00farate de haber creado el repositorio en GitHub.
2. Verifica que el nombre del repositorio sea exactamente `arte-eterno-nft`.
3. Comprueba que estu00e9s utilizando la cuenta correcta (`ricardoduhalt2`).

### Error al hacer push

Si recibes un error al hacer push al repositorio, puede ser debido a:

1. Problemas de autenticaciu00f3n: Asegu00farate de tener las credenciales correctas configuradas.
2. Conflictos de rama: Asegu00farate de estar en la rama `main`.
3. Repositorio remoto no configurado correctamente: Verifica la URL del repositorio remoto con `git remote -v`.

## Despuu00e9s de configurar GitHub

Una vez que hayas subido tu cu00f3digo a GitHub, puedes proceder con el despliegue en Vercel siguiendo las instrucciones en el archivo `DEPLOY.md`.