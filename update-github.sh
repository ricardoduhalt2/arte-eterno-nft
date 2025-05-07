#!/bin/bash

# Este script actualiza el repositorio con los cambios realizados

# Añadir todos los archivos modificados al staging
echo "Añadiendo archivos modificados al staging..."
git add .

# Hacer commit con los cambios
echo "Haciendo commit con los cambios..."
git commit -m "Fix: Corregidos errores de ESLint para despliegue en Vercel"

# Subir los cambios al repositorio remoto
echo "Subiendo cambios a GitHub..."
git push origin main

echo "¡Proceso completado!"
echo "Verifica tu repositorio en: https://github.com/ricardoduhalt2/arte-eterno-nft"