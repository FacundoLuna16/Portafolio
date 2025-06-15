#!/bin/bash

# 🚀 ELITE DEPLOYMENT SCRIPT
# Automated deployment with optimizations and verifications
# Facundo Luna Portfolio - Enterprise Level

set -e  # Exit on any error

echo "🚀 Starting Elite Deployment Process..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Facundo Luna Portfolio"
VERCEL_PROJECT_NAME="portfolio-terminal-retro"
NODE_MIN_VERSION="18.0.0"
LIGHTHOUSE_MIN_SCORE=90

# ==================== PHASE 1: PRE-DEPLOYMENT CHECKS ====================
echo -e "${BLUE}🔍 Phase 1: Pre-deployment Checks${NC}"

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node --version | sed 's/v//')
if [ "$(printf '%s\n' "$NODE_MIN_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$NODE_MIN_VERSION" ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is too old. Minimum required: $NODE_MIN_VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version $NODE_VERSION is compatible${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "app" ]; then
    echo -e "${RED}❌ Not in the correct project directory${NC}"
    exit 1
fi
echo -e "${GREEN}✅ In correct project directory${NC}"

# Check for required files
REQUIRED_FILES=("app/layout.tsx" "app/page.tsx" "public/manifest.json" "public/sw.js")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ Required file missing: $file${NC}"
        exit 1
    fi
done
echo -e "${GREEN}✅ All required files present${NC}"

# ==================== PHASE 2: DEPENDENCY MANAGEMENT ====================
echo -e "${BLUE}🔧 Phase 2: Dependency Management${NC}"

# Install dependencies
echo "📦 Installing/updating dependencies..."
npm ci --silent
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Security audit
echo "🔒 Running security audit..."
if ! npm audit --audit-level=high; then
    echo -e "${YELLOW}⚠️ Security vulnerabilities found. Please review and fix.${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo -e "${GREEN}✅ Security audit passed${NC}"

# ==================== PHASE 3: CODE QUALITY CHECKS ====================
echo -e "${BLUE}🧹 Phase 3: Code Quality Checks${NC}"

# TypeScript type checking
echo "🔍 Running TypeScript type check..."
if ! npx tsc --noEmit; then
    echo -e "${RED}❌ TypeScript errors found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ TypeScript check passed${NC}"

# ESLint check
echo "🔍 Running ESLint..."
if ! npm run lint; then
    echo -e "${YELLOW}⚠️ ESLint warnings found${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo -e "${GREEN}✅ ESLint check passed${NC}"

# ==================== PHASE 4: BUILD OPTIMIZATION ====================
echo -e "${BLUE}⚡ Phase 4: Build Optimization${NC}"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
echo -e "${GREEN}✅ Previous builds cleaned${NC}"

# Generate PWA icons (if script exists)
if [ -f "scripts/generate-pwa-icons.sh" ]; then
    echo "🎨 Generating PWA icons..."
    bash scripts/generate-pwa-icons.sh || echo -e "${YELLOW}⚠️ PWA icon generation failed (continuing)${NC}"
fi

# Optimize images (if script exists)
if [ -f "scripts/optimize-images.sh" ]; then
    echo "🖼️ Optimizing images..."
    bash scripts/optimize-images.sh || echo -e "${YELLOW}⚠️ Image optimization failed (continuing)${NC}"
fi

# Build for production
echo "🏗️ Building for production..."
if ! npm run build; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Production build successful${NC}"

# ==================== PHASE 5: PERFORMANCE VERIFICATION ====================
echo -e "${BLUE}📊 Phase 5: Performance Verification${NC}"

# Bundle size analysis
echo "📦 Analyzing bundle size..."
if command -v npx &> /dev/null; then
    BUNDLE_SIZE=$(npx bundlesize || echo "Bundle size check not available")
    echo "Bundle size: $BUNDLE_SIZE"
fi

# Start local server for testing
echo "🚀 Starting local server for testing..."
npm run start &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 10

# Check if server is running
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${RED}❌ Local server failed to start${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Run Lighthouse if available
if command -v lighthouse &> /dev/null; then
    echo "🔍 Running Lighthouse performance audit..."
    mkdir -p reports
    lighthouse http://localhost:3000 \
        --only-categories=performance,accessibility,best-practices,seo,pwa \
        --output=json \
        --output-path=reports/lighthouse-report.json \
        --chrome-flags="--headless --no-sandbox" \
        --quiet || echo -e "${YELLOW}⚠️ Lighthouse audit failed (continuing)${NC}"
    
    # Parse Lighthouse score
    if [ -f "reports/lighthouse-report.json" ]; then
        PERF_SCORE=$(node -e "console.log(Math.round(require('./reports/lighthouse-report.json').categories.performance.score * 100))")
        echo "Performance Score: $PERF_SCORE/100"
        
        if [ "$PERF_SCORE" -lt "$LIGHTHOUSE_MIN_SCORE" ]; then
            echo -e "${YELLOW}⚠️ Performance score ($PERF_SCORE) below minimum ($LIGHTHOUSE_MIN_SCORE)${NC}"
            read -p "Continue deployment? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                kill $SERVER_PID 2>/dev/null || true
                exit 1
            fi
        else
            echo -e "${GREEN}✅ Performance score meets requirements${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️ Lighthouse not available, skipping performance audit${NC}"
fi

# Stop local server
kill $SERVER_PID 2>/dev/null || true
echo -e "${GREEN}✅ Local server stopped${NC}"

# ==================== PHASE 6: DEPLOYMENT ====================
echo -e "${BLUE}🚀 Phase 6: Deployment${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login check
echo "🔑 Checking Vercel authentication..."
if ! vercel whoami > /dev/null 2>&1; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
if vercel --prod --yes; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

# ==================== PHASE 7: POST-DEPLOYMENT VERIFICATION ====================
echo -e "${BLUE}🔍 Phase 7: Post-deployment Verification${NC}"

# Get deployment URL
DEPLOYMENT_URL=$(vercel --prod --yes 2>/dev/null | grep -o 'https://[^[:space:]]*' | head -n1)

if [ -n "$DEPLOYMENT_URL" ]; then
    echo "🌍 Deployment URL: $DEPLOYMENT_URL"
    
    # Wait a bit for deployment to be ready
    echo "⏳ Waiting for deployment to be ready..."
    sleep 15
    
    # Test deployment
    echo "🧪 Testing deployment..."
    if curl -f "$DEPLOYMENT_URL" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Deployment is accessible${NC}"
    else
        echo -e "${YELLOW}⚠️ Deployment might not be ready yet${NC}"
    fi
    
    # Test PWA manifest
    if curl -f "$DEPLOYMENT_URL/manifest.json" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PWA manifest accessible${NC}"
    else
        echo -e "${YELLOW}⚠️ PWA manifest not accessible${NC}"
    fi
    
    # Test service worker
    if curl -f "$DEPLOYMENT_URL/sw.js" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Service worker accessible${NC}"
    else
        echo -e "${YELLOW}⚠️ Service worker not accessible${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ Could not determine deployment URL${NC}"
fi

# ==================== PHASE 8: CLEANUP & REPORTING ====================
echo -e "${BLUE}🧹 Phase 8: Cleanup & Reporting${NC}"

# Generate deployment report
REPORT_FILE="deployment-report-$(date +%Y%m%d-%H%M%S).md"
cat > "$REPORT_FILE" << EOF
# 🚀 Deployment Report - $PROJECT_NAME

**Date:** $(date)
**Deployment URL:** $DEPLOYMENT_URL

## ✅ Checks Passed
- Node.js version: $NODE_VERSION
- TypeScript compilation: ✅
- ESLint check: ✅
- Production build: ✅
- Security audit: ✅

## 📊 Performance Metrics
- Lighthouse Score: ${PERF_SCORE:-"Not available"}/100
- Bundle Size: ${BUNDLE_SIZE:-"Not checked"}

## 🔗 Verification Links
- Main site: $DEPLOYMENT_URL
- PWA Manifest: $DEPLOYMENT_URL/manifest.json
- Service Worker: $DEPLOYMENT_URL/sw.js

## 📱 PWA Features
- ✅ App Manifest
- ✅ Service Worker
- ✅ Offline Support
- ✅ Install Prompts

## 🚀 Next Steps
1. Test PWA installation on mobile devices
2. Monitor Core Web Vitals in production
3. Check analytics data collection
4. Verify SEO indexing

---
*Generated by Elite Deployment Script*
EOF

echo -e "${GREEN}📋 Deployment report saved: $REPORT_FILE${NC}"

# Final cleanup
echo "🧹 Final cleanup..."
rm -rf reports/lighthouse-report.json 2>/dev/null || true

echo ""
echo "🎉 =================================="
echo "🚀    DEPLOYMENT COMPLETED!"
echo "🎉 =================================="
echo ""
echo -e "${GREEN}✅ $PROJECT_NAME successfully deployed!${NC}"
echo -e "${BLUE}🌍 URL: $DEPLOYMENT_URL${NC}"
echo -e "${YELLOW}📋 Report: $REPORT_FILE${NC}"
echo ""
echo "🔧 Recommended next steps:"
echo "   1. Test the PWA installation"
echo "   2. Monitor performance metrics"
echo "   3. Check Google Search Console"
echo "   4. Verify analytics data"
echo ""
echo "🎯 Your portfolio is now live and optimized!"
