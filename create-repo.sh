#!/bin/bash

# Este script crea un repositorio en GitHub y sube el código

# Solicitar el token de acceso personal de GitHub
echo "Para crear un repositorio en GitHub, necesitas un token de acceso personal."
echo "Puedes crear uno en: https://github.com/settings/tokens (asegúrate de darle permisos de 'repo')"
read -p "Ingresa tu token de acceso personal de GitHub: " GITHUB_TOKEN

# Nombre del repositorio
REPO_NAME="arte-eterno-nft"

# Crear el repositorio en GitHub
echo "Creando repositorio $REPO_NAME en GitHub..."
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"'"$REPO_NAME"'", "description":"Marketplace de NFTs Arte Eterno", "private":false}'

# Verificar si el repositorio ya está configurado como remoto
REMOTE_EXISTS=$(git remote -v | grep -c "origin")

if [ $REMOTE_EXISTS -eq 0 ]; then
  # Configurar el repositorio remoto
  echo "Configurando repositorio remoto..."
  git remote add origin https://github.com/ricardoduhalt2/$REPO_NAME.git
else
  echo "El repositorio remoto ya está configurado."
fi

# Asegurarse de que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ -z "$CURRENT_BRANCH" ]; then
  # No hay commits todavía, crear la rama main
  echo "Inicializando repositorio y creando rama main..."
  git checkout -b main
elif [ "$CURRENT_BRANCH" != "main" ]; then
  # Cambiar a la rama main
  echo "Cambiando a la rama main..."
  git branch -M main
fi

# Añadir todos los archivos si no hay commits
COMMIT_COUNT=$(git rev-list --count --all 2>/dev/null || echo "0")
if [ "$COMMIT_COUNT" = "0" ]; then
  echo "Añadiendo archivos al staging..."
  git add .
  
  echo "Haciendo el primer commit..."
  git commit -m "Versión inicial del marketplace de NFTs Arte Eterno"
fi

# Subir el código al repositorio remoto
echo "Subiendo código a GitHub..."
git push -u origin main

echo "¡Proceso completado!"
echo "Verifica tu repositorio en: https://github.com/ricardoduhalt2/$REPO_NAME"