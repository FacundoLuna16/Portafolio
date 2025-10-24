# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShopUp is a comprehensive e-commerce platform built on a microservices architecture that enables small and medium-sized businesses to manage their product catalogs (with AI assistance), increase visibility, manage sales, and build customer trust through ratings and reviews.

## Common Development Commands

### Full System Development
```bash
# Start entire system with Docker Compose
docker-compose up -d

# Quick development setup (runs Keycloak, backend services, and frontend)
./up.sh

# Production-style deployment
docker-compose -f docker-compose.yml up -d
```

### Frontend (React + Vite)
```bash
cd FrontEnd/FrontEnd
npm install
npm run dev          # Development server
npm run build        # Production build  
npm run lint         # ESLint checking
npm run preview      # Preview production build
```

### Backend Services (Spring Boot + Maven)
```bash
# Core microservice (port 8081)
cd BackEnd/Core
mvn clean spring-boot:run    # Run development server
mvn clean test              # Run tests (requires database)
mvn clean package          # Build JAR

# Gateway microservice (port 8080)  
cd BackEnd/Gateway
mvn clean spring-boot:run    # Run development server
mvn clean test              # Run tests
mvn clean package          # Build JAR
```

### AI Service (Python + FastAPI)
```bash
cd BackEnd/AI
pip install -r requirements.txt
python main.py              # Run FastAPI server
```

### Authentication (Keycloak)
```bash
cd Keycloak
docker-compose up -d        # Development setup
# Admin console: http://localhost:8083
```

## Architecture Overview

### Microservices Architecture
- **Core Service** (Java Spring Boot): Business logic, product management, user management, sales
- **Gateway Service** (Spring Cloud Gateway): API routing, authentication, authorization
- **AI Service** (Python FastAPI): Product embeddings, voice processing, NLP features
- **Frontend** (React): User interface for all roles (emprendedor, comprador, admin)
- **Keycloak**: Identity and access management

### Technology Stack
- **Backend**: Java 24, Spring Boot 3.4+, PostgreSQL, OpenSearch
- **Frontend**: React 19, Vite, Material-UI v7, Redux Toolkit
- **Authentication**: Keycloak with JWT tokens
- **Infrastructure**: Docker, Nginx, Docker Compose
- **External APIs**: MercadoPago (payments), OpenAI (AI features)

### Service Communication
- **API Gateway** routes requests to appropriate microservices based on role and path
- **JWT Authentication** via Keycloak with role-based authorization (emprendedor, comprador, admin)
- **Resource-level Authorization** ensures users can only access their own data
- **Event-driven** updates for product embeddings and search indexing

### Database Architecture
- **PostgreSQL**: Primary database for Core service
- **OpenSearch**: Product search and embeddings storage
- **Keycloak Database**: User management and authentication

## Development Workflow

### Service-Specific Guidance
Each major component has its own CLAUDE.md with detailed instructions:
- `FrontEnd/FrontEnd/CLAUDE.md` - React frontend architecture and patterns
- `BackEnd/Core/CLAUDE.md` - Core business logic and hexagonal architecture  
- `BackEnd/Gateway/CLAUDE.md` - API gateway routing and security
- `Keycloak/CLAUDE.md` - Authentication server configuration

### Git Strategy
- **main**: Production-ready code, stable releases
- **desarrollo**: Integration branch for staging
- **PF-###-type**: Feature branches from desarrollo
- **hotfix/PF-###-type**: Emergency fixes from main

### Environment Setup
1. Start infrastructure: `docker-compose up -d keycloak dbCore opensearch`
2. Start backend services: Core and Gateway (via Docker or Maven)
3. Start frontend: `cd FrontEnd/FrontEnd && npm run dev`
4. Access application at configured URLs

## Key Integration Points

### Authentication Flow
1. Users authenticate via Keycloak (port 8083)  
2. JWT tokens include role information (emprendedor, comprador, admin)
3. Gateway validates tokens and routes to appropriate microservice endpoints
4. Services verify resource-level permissions using JWT user ID

### API Structure
```
/api/emprendedor/v1/**  → Core service (entrepreneur role)
/api/comprador/v1/**    → Core service (buyer role)
/api/admin/v1/**        → Core service (admin role)  
/api/v1/public/**       → Core service (public access)
```

### AI Features
- **Voice Upload**: Audio recordings processed for product creation
- **Embeddings**: Products have vector embeddings for semantic search
- **Search**: OpenSearch provides fast product discovery
- **NLP**: Text processing for product descriptions and attributes

### Payment Integration
- **MercadoPago**: Payment processing with webhook handling
- **Marketplace Model**: Commission-based transactions
- **Account Linking**: Entrepreneurs link MercadoPago accounts for payments

## Important Development Notes

### Testing
- **Frontend**: No testing framework configured (do not assume Jest/Vitest)
- **Backend**: JUnit tests require PostgreSQL database connection
- **Integration**: Docker Compose provides full testing environment

### Security Considerations  
- All API endpoints protected by JWT authentication
- Role-based access control enforced at Gateway level
- Resource ownership verified via UUID matching
- Sensitive data (API keys, tokens) managed via environment variables

### Performance
- **Embeddings**: Generated asynchronously to avoid blocking operations
- **Search**: OpenSearch provides sub-second product queries
- **Caching**: Frontend uses Redux for state management
- **CDN**: Static assets served via Nginx in production

### External Dependencies
- **OpenAI API**: Required for AI features (configurable)
- **MercadoPago API**: Required for payment processing
- **PostgreSQL**: Required for data persistence
- **OpenSearch**: Required for product search functionality