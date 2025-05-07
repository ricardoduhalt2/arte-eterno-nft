#!/bin/bash

# Configurar identidad de Git (reemplaza con tus datos)
echo "Configurando identidad de Git..."
git config --global user.email "ricardoduhalt2@gmail.com"
git config --global user.name "Ricardo Duhalt"

# Inicializar repositorio Git
echo "Inicializando repositorio Git..."
git init

# Configurar la rama principal como 'main'
git config --global init.defaultBranch main

# Añadir todos los archivos al staging
echo "Añadiendo archivos al staging..."
git add .

# Hacer el primer commit
echo "Haciendo el primer commit..."
git commit -m "Versión inicial del marketplace de NFTs Arte Eterno"

# Crear y cambiar a la rama main si estamos en master
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "master" ]; then
  echo "Cambiando nombre de rama de 'master' a 'main'..."
  git branch -M main
fi

# Añadir el repositorio remoto
echo "Añadiendo repositorio remoto..."
git remote add origin https://github.com/ricardoduhalt2/arte-eterno-nft.git

# Subir el código al repositorio remoto
echo "Subiendo código a GitHub..."
git push -u origin main

echo "¡Repositorio inicializado y código subido a GitHub!"
echo "Ahora puedes configurar el despliegue en Vercel desde: https://vercel.com/import/git"