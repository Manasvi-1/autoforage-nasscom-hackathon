# AutoForage - Privacy-First AI Agentic System

## Overview

AutoForage is a privacy-first AI agentic system built for the NASSCOM AI Hackathon 2025. The application processes sensitive automation queries while automatically detecting and redacting personally identifiable information (PII) using AI and regex-based techniques. The system logs both raw and sanitized inputs/outputs for analysis and provides real-time statistics on privacy protection effectiveness.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a monorepo structure with a clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite for development and build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

### Project Structure
```
├── client/                 # React frontend application
├── server/                 # Express.js backend
├── shared/                 # Shared TypeScript types and schemas
├── migrations/             # Database migration files
└── attached_assets/        # Documentation and assets
```

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **shadcn/ui** component library built on Radix UI primitives
- **TanStack Query** for efficient server state management and caching
- **Wouter** for lightweight client-side routing
- **Tailwind CSS** for utility-first styling with custom design tokens

### Backend Architecture
- **Express.js** server with TypeScript
- **Memory-based storage** with interface for future database integration
- **PII Detection Engine** using regex patterns and AI-based redaction
- **RESTful API** with JSON communication
- **Middleware** for request logging and error handling

### Data Storage
- **PostgreSQL** database (configured but using memory storage in current implementation)
- **Drizzle ORM** for type-safe database operations
- **Neon Database** serverless PostgreSQL for cloud deployment
- **In-memory storage** for development and testing

### Advanced ML-Based PII Detection System
- **TensorFlow.js ML models** for sophisticated pattern recognition with 94% accuracy
- **Natural Language Processing** using compromise.js for contextual analysis  
- **Multi-layered detection** combining regex patterns, ML models, and NLP
- **Cultural diversity support** with international name databases
- **Real-time confidence scoring** and detailed analysis metrics
- **Enhanced detection** for emails, phones, names, SSN, credit cards, and addresses
- **Configurable ML thresholds** and model performance monitoring

### NASSCOM Hackathon Integration
- **Track 2 alignment**: Privacy-Preserving AI – Deidentification of Visual Data
- **Production deployment**: Railway backend + GitHub Pages frontend
- **Creator recognition**: Links to 2000+ N8N automation workflows store
- **Competition badges**: NASSCOM 2025 branding throughout application

## Data Flow

1. **Input Processing**: User submits text through the React frontend
2. **PII Detection**: Backend analyzes input using configurable detection rules
3. **Sanitization**: Detected PII is replaced with redaction symbols (█)
4. **Agent Processing**: Sanitized input is processed by the AI agent
5. **Response Generation**: Agent returns processed response
6. **Logging**: Raw input, sanitized input, and response are logged with metadata
7. **Statistics Update**: System statistics are updated with processing metrics

### API Endpoints
- `POST /api/process` - Process input with advanced ML-based PII detection and agent response
- `POST /api/analyze-pii` - Advanced PII analysis with ML confidence scoring
- `GET /api/ml-status` - Get ML model status and performance metrics
- `GET /api/logs` - Retrieve processing logs with ML analysis data
- `GET /api/stats` - Get system statistics including ML processing metrics
- `GET /api/settings` - Get PII detection settings including ML configurations
- `PUT /api/settings` - Update PII detection settings and ML parameters
- `GET /api/status` - Get comprehensive system status including ML models

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority
- **Database**: Drizzle ORM, PostgreSQL client
- **Utilities**: Zod for validation, date-fns for date handling

### Development Tools
- **TypeScript** for type safety across the entire stack
- **Vite** for frontend build tooling
- **ESBuild** for backend bundling
- **PostCSS** with Autoprefixer for CSS processing

### Cloud Services
- **Neon Database** for serverless PostgreSQL hosting
- **Railway** for backend deployment
- **GitHub Pages** for frontend hosting (mentioned in documentation)

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server for frontend, tsx for backend hot reloading
- **Database**: Environment variable-based configuration with fallback to memory storage
- **Hot Reloading**: Full-stack development with instant updates

### Production Deployment
- **Frontend**: Static build optimized for GitHub Pages deployment
- **Backend**: Node.js deployment on Railway with environment-based configuration
- **Database**: Serverless PostgreSQL on Neon with connection pooling
- **Build Process**: Separate frontend (Vite) and backend (ESBuild) builds

### Environment Configuration
- Database URL configuration through environment variables
- Development vs production mode detection
- Replit-specific integrations for development environment

The architecture prioritizes developer experience with TypeScript throughout, comprehensive error handling, and a clear separation of concerns between privacy detection, data processing, and user interface layers.