#!/bin/bash

# Este script configura el repositorio remoto y sube el cu00f3digo a un repositorio existente

# Nombre del repositorio
REPO_NAME="arte-eterno-nft"

# Verificar si el repositorio ya estu00e1 configurado como remoto
REMOTE_EXISTS=$(git remote -v | grep -c "origin")

if [ $REMOTE_EXISTS -eq 0 ]; then
  # Configurar el repositorio remoto
  echo "Configurando repositorio remoto..."
  git remote add origin https://github.com/ricardoduhalt2/$REPO_NAME.git
else
  # Actualizar la URL del repositorio remoto
  echo "Actualizando URL del repositorio remoto..."
  git remote set-url origin https://github.com/ricardoduhalt2/$REPO_NAME.git
fi

# Asegurarse de que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ -z "$CURRENT_BRANCH" ]; then
  # No hay commits todavu00eda, crear la rama main
  echo "Inicializando repositorio y creando rama main..."
  git checkout -b main
elif [ "$CURRENT_BRANCH" != "main" ]; then
  # Cambiar a la rama main
  echo "Cambiando a la rama main..."
  git branch -M main
fi

# Au00f1adir todos los archivos si no hay commits
COMMIT_COUNT=$(git rev-list --count --all 2>/dev/null || echo "0")
if [ "$COMMIT_COUNT" = "0" ]; then
  echo "Au00f1adiendo archivos al staging..."
  git add .
  
  echo "Haciendo el primer commit..."
  git commit -m "Versiu00f3n inicial del marketplace de NFTs Arte Eterno"
fi

# Subir el cu00f3digo al repositorio remoto
echo "Subiendo cu00f3digo a GitHub..."
git push -u origin main

echo "u00a1Proceso completado!"
echo "Verifica tu repositorio en: https://github.com/ricardoduhalt2/$REPO_NAME"