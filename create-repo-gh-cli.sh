#!/bin/bash

# Este script crea un repositorio en GitHub usando GitHub CLI y sube el cu00f3digo

# Verificar si GitHub CLI estu00e1 instalado
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) no estu00e1 instalado. Por favor, instu00e1lalo primero:"
    echo "https://cli.github.com/manual/installation"
    exit 1
fi

# Nombre del repositorio
REPO_NAME="arte-eterno-nft"

# Verificar si el usuario estu00e1 autenticado en GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "No estu00e1s autenticado en GitHub CLI. Ejecuta 'gh auth login' primero."
    exit 1
fi

# Crear el repositorio en GitHub
echo "Creando repositorio $REPO_NAME en GitHub..."
gh repo create $REPO_NAME --public --description "Marketplace de NFTs Arte Eterno" --source=. --push

echo "u00a1Proceso completado!"
echo "Verifica tu repositorio en: https://github.com/ricardoduhalt2/$REPO_NAME"