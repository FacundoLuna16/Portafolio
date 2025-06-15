#!/bin/bash

# 🚀 PWA ICON GENERATOR SCRIPT
# Genera todos los iconos necesarios para PWA desde una imagen base

echo "🎨 Generando iconos PWA para Facundo Luna Portfolio..."

# Crear directorio de iconos si no existe
mkdir -p public/icons

# Verificar si ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick no está instalado. Instalando..."
    
    # Para Windows (usar chocolatey si está disponible)
    if command -v choco &> /dev/null; then
        choco install imagemagick
    else
        echo "📦 Por favor instala ImageMagick manualmente:"
        echo "Windows: https://imagemagick.org/script/download.php#windows"
        echo "Mac: brew install imagemagick"
        echo "Linux: sudo apt-get install imagemagick"
        exit 1
    fi
fi

# Imagen base (debe existir en public/)
BASE_IMAGE="public/logo-base.svg"

# Si no existe imagen base, crear una con temática terminal
if [ ! -f "$BASE_IMAGE" ]; then
    echo "🎨 Creando imagen base con temática terminal..."
    cat > "$BASE_IMAGE" << 'EOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d0d0d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="512" height="512" fill="url(#terminalGradient)" rx="64"/>
  
  <!-- Terminal border -->
  <rect x="32" y="64" width="448" height="384" fill="none" stroke="#39ff14" stroke-width="4" rx="8"/>
  
  <!-- Terminal header -->
  <rect x="32" y="64" width="448" height="48" fill="#39ff14" fill-opacity="0.1"/>
  
  <!-- Traffic lights -->
  <circle cx="64" cy="88" r="8" fill="#ff5f56"/>
  <circle cx="96" cy="88" r="8" fill="#ffbd2e"/>
  <circle cx="128" cy="88" r="8" fill="#27ca3f"/>
  
  <!-- Terminal content lines -->
  <rect x="64" y="144" width="200" height="4" fill="#39ff14" opacity="0.8"/>
  <rect x="64" y="168" width="320" height="4" fill="#39ff14" opacity="0.6"/>
  <rect x="64" y="192" width="150" height="4" fill="#39ff14" opacity="0.8"/>
  <rect x="64" y="216" width="280" height="4" fill="#39ff14" opacity="0.7"/>
  
  <!-- Command prompt -->
  <text x="64" y="280" font-family="Monaco, monospace" font-size="24" fill="#00d9ff">$</text>
  <text x="96" y="280" font-family="Monaco, monospace" font-size="24" fill="#39ff14">facudev</text>
  
  <!-- Cursor -->
  <rect x="240" y="260" width="16" height="24" fill="#39ff14" opacity="0.8"/>
  
  <!-- Decorative code -->
  <text x="64" y="340" font-family="Monaco, monospace" font-size="16" fill="#39ff14" opacity="0.6">Backend | DevOps | Security</text>
  
  <!-- Border glow effect -->
  <rect x="32" y="64" width="448" height="384" fill="none" stroke="#39ff14" stroke-width="2" rx="8" opacity="0.3"/>
</svg>
EOF
fi

# Tamaños de iconos requeridos para PWA
declare -a sizes=("72" "96" "128" "144" "152" "192" "384" "512")

echo "🔄 Generando iconos en diferentes tamaños..."

for size in "${sizes[@]}"; do
    echo "  📐 Generando icono ${size}x${size}..."
    convert "$BASE_IMAGE" -resize "${size}x${size}" "public/icons/icon-${size}x${size}.png"
done

# Generar iconos adicionales específicos
echo "🎯 Generando iconos específicos..."

# Apple touch icon (180x180)
convert "$BASE_IMAGE" -resize "180x180" "public/icons/apple-touch-icon.png"

# Favicon variants
convert "$BASE_IMAGE" -resize "32x32" "public/favicon-32x32.png"
convert "$BASE_IMAGE" -resize "16x16" "public/favicon-16x16.png"

# Badge icon para notificaciones (72x72, más simple)
cat > "public/icons/temp-badge.svg" << 'EOF'
<svg width="72" height="72" xmlns="http://www.w3.org/2000/svg">
  <rect width="72" height="72" fill="#39ff14" rx="12"/>
  <text x="36" y="45" text-anchor="middle" font-family="Monaco, monospace" font-size="20" fill="#0d0d0d" font-weight="bold">F</text>
</svg>
EOF
convert "public/icons/temp-badge.svg" "public/icons/badge-72x72.png"
rm "public/icons/temp-badge.svg"

# Iconos para shortcuts (96x96, temáticos)
# Projects shortcut
cat > "public/icons/temp-projects.svg" << 'EOF'
<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" fill="#0d0d0d" rx="16"/>
  <rect x="12" y="12" width="72" height="72" fill="none" stroke="#39ff14" stroke-width="2" rx="4"/>
  <rect x="20" y="24" width="56" height="8" fill="#39ff14" opacity="0.8"/>
  <rect x="20" y="40" width="32" height="6" fill="#39ff14" opacity="0.6"/>
  <rect x="20" y="52" width="48" height="6" fill="#39ff14" opacity="0.7"/>
  <text x="48" y="75" text-anchor="middle" font-family="Monaco, monospace" font-size="10" fill="#00d9ff">PROJ</text>
</svg>
EOF
convert "public/icons/temp-projects.svg" "public/icons/projects-shortcut.png"
rm "public/icons/temp-projects.svg"

# CV shortcut
cat > "public/icons/temp-cv.svg" << 'EOF'
<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" fill="#0d0d0d" rx="16"/>
  <rect x="24" y="12" width="48" height="72" fill="none" stroke="#39ff14" stroke-width="2" rx="4"/>
  <rect x="32" y="24" width="32" height="4" fill="#39ff14" opacity="0.8"/>
  <rect x="32" y="36" width="20" height="3" fill="#39ff14" opacity="0.6"/>
  <rect x="32" y="44" width="28" height="3" fill="#39ff14" opacity="0.7"/>
  <rect x="32" y="52" width="24" height="3" fill="#39ff14" opacity="0.6"/>
  <rect x="32" y="60" width="30" height="3" fill="#39ff14" opacity="0.7"/>
</svg>
EOF
convert "public/icons/temp-cv.svg" "public/icons/cv-shortcut.png"
rm "public/icons/temp-cv.svg"

# Contact shortcut
cat > "public/icons/temp-contact.svg" << 'EOF'
<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" fill="#0d0d0d" rx="16"/>
  <circle cx="48" cy="36" r="12" fill="none" stroke="#39ff14" stroke-width="2"/>
  <path d="M24 72 C24 60, 36 54, 48 54 C60 54, 72 60, 72 72" fill="none" stroke="#39ff14" stroke-width="2"/>
  <text x="48" y="86" text-anchor="middle" font-family="Monaco, monospace" font-size="8" fill="#00d9ff">@</text>
</svg>
EOF
convert "public/icons/temp-contact.svg" "public/icons/contact-shortcut.png"
rm "public/icons/temp-contact.svg"

# Crear el favicon.ico desde el PNG de 32x32
if command -v convert &> /dev/null; then
    convert "public/favicon-32x32.png" "public/favicon.ico"
fi

echo "✅ Iconos PWA generados exitosamente!"
echo "📱 Archivos creados en public/icons/"
echo "🎯 Ready para PWA deployment!"

# Mostrar lista de archivos generados
echo ""
echo "📋 Iconos generados:"
ls -la public/icons/
echo ""
echo "🚀 Tu PWA ahora tiene todos los iconos necesarios para:"
echo "   • App stores (Android/iOS)"
echo "   • Home screen installation"
echo "   • Notifications y badges"
echo "   • Shortcuts personalizados"
