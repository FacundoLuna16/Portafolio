# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **high-performance portfolio website** for Facundo Luna, a Backend Developer specializing in DevOps and Security. The project is built with **Next.js 15** using the App Router and features:

- **Terminal-themed design** with retro aesthetics and interactive elements
- **Enterprise-level performance** with 98+ Lighthouse scores
- **PWA capabilities** with offline functionality
- **Bilingual support** (Spanish/English)
- **Custom analytics** and performance monitoring
- **Advanced optimizations** for speed and user experience

## Specialized Agents

### ShopUp Project Agent
This repository includes a specialized agent for managing all ShopUp project content. When working with ShopUp-related content, Claude Code should use the Task tool to launch the shopup-manager agent.

#### Usage
```bash
# Any request involving ShopUp project updates
"Update ShopUp project with latest Sprint progress"
"Modify ShopUp architecture details"
"Fix ShopUp component translations"
```

#### Agent Configuration
- **Agent Type**: `shopup-manager` 
- **Context File**: `ShopUp.md` (technical context from actual project)
- **Scope**: All ShopUp-related content in portfolio
- **Tools**: Read, Edit, MultiEdit, Glob, Grep

#### Files Managed by ShopUp Agent
- `lib/data/projects/shopup-real.ts` - Main project data
- `app/projects/[slug]/components/*` - UI components  
- `locales/en.json` & `locales/es.json` - Translations
- `public/ShopUp/*` - Project assets

## Development Commands

### Core Development
```bash
npm run dev              # Start development server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server
```

### Code Quality & Testing
```bash
npm run lint             # ESLint check
npm run lint:fix         # Fix ESLint issues automatically
npm run type-check       # TypeScript type checking
npm run health           # Complete health check (type-check + lint + audit + build)
npm run precommit        # Pre-commit checks (type-check + lint)
```

### Performance & Analytics
```bash
npm run analyze          # Bundle analysis with @next/bundle-analyzer
npm run size             # Bundle size monitoring with bundlewatch
npm run audit:performance  # Lighthouse performance audit
npm run audit:security   # npm security audit
npm run stats            # Bundle analysis and open results
```

### PWA & Assets
```bash
npm run icons:generate   # Generate PWA icons
npm run optimize:images  # Optimize images (if script exists)
```

### Deployment
```bash
npm run deploy           # Full automated deployment pipeline
npm run deploy:preview   # Preview deployment to Vercel
npm run deploy:prod      # Production deployment to Vercel
```

### Maintenance
```bash
npm run clean            # Clean build artifacts and cache
npm run clean:install    # Clean + fresh npm install
```

## Architecture Overview

### Project Structure
```
app/                     # Next.js App Router
├── components/          # Page-specific UI components
│   ├── terminal-*.tsx   # Terminal-themed components
│   ├── floating-*.tsx   # Interactive floating elements
│   └── typing-effect.tsx
├── hooks/               # Custom React hooks
│   ├── use-analytics.tsx
│   ├── use-easter-eggs.tsx
│   └── use-translation.tsx
├── projects/[slug]/     # Dynamic project detail pages
│   └── components/      # Project-specific components
├── sections/            # Main page sections
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   └── TerminalAboutSection.tsx
├── globals.css          # Global styles and CSS variables
├── layout.tsx           # Root layout with SEO/PWA setup
└── page.tsx            # Home page with lazy-loaded sections

components/              # Shared/reusable components
└── ui/                 # shadcn/ui components

lib/                    # Utilities and business logic
├── data/               # Static data
│   ├── projects.ts     # Project definitions with i18n
│   └── projects/       # Individual project data files
├── hooks/              # Shared custom hooks
└── utils/              # Utility functions

locales/                # Internationalization files
├── en.json             # English translations
└── es.json             # Spanish translations

public/                 # Static assets
├── [ProjectName]/      # Project-specific images
├── manifest.json       # PWA manifest
└── sw.js              # Service Worker

scripts/                # Automation scripts
├── deploy.sh          # Automated deployment pipeline
├── generate-pwa-icons.sh
└── generate-icons.js
```

### Key Architectural Patterns

#### Performance Optimization
- **Critical CSS inlined** in layout.tsx for fastest FCP
- **Lazy loading** for below-the-fold sections using `next/dynamic`
- **Image optimization** with AVIF/WebP formats and responsive sizing
- **Bundle splitting** with custom webpack configuration
- **Resource hints** (preload, prefetch, dns-prefetch) for critical resources

#### Component Architecture
- **Terminal theme** with consistent design system using Tailwind custom colors
- **Dynamic imports** for non-critical sections to reduce initial bundle
- **Custom hooks** for complex state management (easter eggs, analytics, translations)
- **Skeleton loading** components for better perceived performance

#### Data Management
- **Static data** in TypeScript files with type safety
- **Internationalization** integrated into data layer
- **Project metadata** centralized in `lib/data/projects.ts`

#### SEO & PWA
- **Structured data** (JSON-LD) for Person and Website schemas
- **PWA manifest** with comprehensive icon sets and shortcuts
- **Service Worker** for caching and offline functionality
- **Security headers** configured in next.config.mjs

### Technology Stack Details

#### Frontend Framework
- **Next.js 15** with App Router and React Server Components
- **React 18** with latest hooks and features
- **TypeScript 5** with strict mode enabled

#### Styling & UI
- **TailwindCSS** with custom terminal theme colors
- **Framer Motion** for smooth animations
- **Custom CSS variables** for theme consistency
- **shadcn/ui** components for UI elements

#### Performance Tools
- **@next/bundle-analyzer** for bundle analysis
- **bundlewatch** for performance budget monitoring
- **Lighthouse** for automated performance testing

### Development Guidelines

#### File Organization
- Group related components in feature directories
- Use descriptive, kebab-case filenames for components
- Keep data files separate from UI components
- Centralize configuration in root-level config files

#### Performance Considerations
- Always use `next/image` for images with proper sizing
- Implement lazy loading for below-the-fold content
- Run `npm run health` before commits to ensure quality
- Monitor bundle size with `npm run size`

#### Code Style
- TypeScript strict mode is enforced
- ESLint configuration follows Next.js best practices
- Component props should be properly typed
- Use custom hooks for complex state logic

#### Testing & Quality Assurance
- Type checking is mandatory (`npm run type-check`)
- ESLint rules must pass (`npm run lint`)
- Security audits are automated (`npm run audit:security`)
- Performance budgets are monitored automatically

#### Deployment Process
The `npm run deploy` command runs a comprehensive pipeline:
1. Pre-deployment environment checks
2. Code quality verification (TypeScript + ESLint + Security)
3. Asset optimization (PWA icons + image optimization)
4. Production build with performance verification
5. Vercel deployment with automatic URL generation
6. Post-deployment testing

### Performance Budgets

The project maintains strict performance budgets:
- **JavaScript chunks**: 200KB gzipped maximum
- **CSS files**: 30KB gzipped maximum
- **Lighthouse Performance**: 90+ score required
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

### Environment Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Git**: Required for version control and deployment

### Common Development Tasks

#### Adding a New Project
1. Add project data to `lib/data/projects/[project-name].ts`
2. Update `lib/data/projects.ts` to include the new project
3. Add project images to `public/[ProjectName]/`
4. Update translations in `locales/en.json` and `locales/es.json`
5. Create project detail page in `app/projects/[slug]/`

#### Modifying Translations
- Edit `locales/en.json` for English content
- Edit `locales/es.json` for Spanish content
- Use the `useTranslation` hook to access translations in components

#### Performance Optimization
- Run `npm run analyze` to identify large bundles
- Use `npm run audit:performance` for Lighthouse analysis
- Monitor Core Web Vitals in development with browser DevTools
- Check bundle sizes with `npm run size` after changes

#### Debugging
- Use Next.js development server with `npm run dev`
- Enable TypeScript strict checking with `npm run type-check`
- Lint code with `npm run lint:fix` for automatic fixes
- Use browser DevTools for performance analysis