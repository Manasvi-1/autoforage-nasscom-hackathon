# AutoForage - Deployment Instructions
## NASSCOM AI Hackathon 2025 Production Deployment

### 🚀 Complete Deployment Guide

## Prerequisites
- Node.js 18+
- Git
- GitHub account
- Railway account (optional for backend)
- Neon Database account (optional for PostgreSQL)

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/Manasvi-1/autoforage-nasscom-hackathon.git
cd autoforage-nasscom-hackathon
```

### 2. Install Dependencies
```bash
# Install all dependencies including ML libraries
npm install

# Verify TensorFlow.js installation
npm list @tensorflow/tfjs-node
```

### 3. Environment Configuration
```bash
# Create .env file
touch .env

# Add environment variables
DATABASE_URL=postgresql://username:password@hostname:port/database
NODE_ENV=development
VITE_API_URL=http://localhost:5000
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Production Deployment

### Railway Backend Deployment

#### 1. Prepare Railway Configuration
```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[services]]
name = "autoforage-backend"
source = "."
```

#### 2. Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy project
railway up
```

#### 3. Environment Variables on Railway
```env
NODE_ENV=production
DATABASE_URL=your_production_postgres_url
PORT=5000
```

### GitHub Pages Frontend Deployment

#### 1. Build Frontend
```bash
npm run build
```

#### 2. Configure GitHub Pages
- Go to repository Settings > Pages
- Source: Deploy from a branch
- Branch: main
- Folder: /dist

#### 3. Update Frontend API URL
```bash
# Update vite.config.ts for production
export default defineConfig({
  base: '/autoforage-nasscom-hackathon/',
  // ... other config
})
```

### Database Setup (Neon)

#### 1. Create Neon Database
- Sign up at https://neon.tech
- Create new project
- Copy connection string

#### 2. Database Configuration
```bash
# Update drizzle.config.ts
export default {
  schema: './shared/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
};
```

#### 3. Run Migrations
```bash
npm run db:push
```

## Testing Deployment

### Backend API Testing
```bash
# Test ML status endpoint
curl https://your-railway-app.railway.app/api/ml-status

# Test PII detection
curl -X POST https://your-railway-app.railway.app/api/process \
  -H "Content-Type: application/json" \
  -d '{"input": "Test with John Smith at john@test.com"}'
```

### Frontend Testing
- Open GitHub Pages URL
- Test PII detection functionality
- Verify ML Analysis Panel displays correctly
- Check real-time statistics updates

## Performance Optimization

### Backend Optimizations
```javascript
// server/index.ts - Production optimizations
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));
}
```

### Frontend Optimizations
```typescript
// vite.config.ts - Build optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
          ml: ['@tensorflow/tfjs-node', 'compromise']
        }
      }
    }
  }
})
```

## Monitoring & Analytics

### Health Check Endpoints
```bash
# System status
GET /api/status

# ML model status
GET /api/ml-status

# Processing statistics
GET /api/stats
```

### Performance Monitoring
- Railway provides built-in metrics
- GitHub Pages has usage analytics
- Custom logging for ML model performance

## Security Considerations

### Environment Security
```bash
# Never commit .env files
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
```

### API Security
```javascript
// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://manasvi-1.github.io' 
    : 'http://localhost:5173',
  credentials: true
}));
```

### Data Protection
- No sensitive PII stored permanently
- Processing logs encrypted in transit
- GDPR compliance with data minimization

## Troubleshooting

### Common Issues

#### TensorFlow.js Loading Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Railway Deployment Failures
```bash
# Check build logs
railway logs

# Verify environment variables
railway variables
```

#### Database Connection Issues
```bash
# Test database connection
npx drizzle-kit introspect:pg --connectionString="your_db_url"
```

### Performance Issues
- Monitor memory usage with TensorFlow.js models
- Implement request rate limiting
- Use CDN for static assets

## Backup & Recovery

### Database Backup
```bash
# Automated backups with Neon
# Point-in-time recovery available
# Export data via pg_dump if needed
```

### Code Backup
- GitHub repository serves as primary backup
- Railway automatic deployments from git
- Local development environment restore

## NASSCOM Submission Checklist

✅ Repository publicly available on GitHub  
✅ Live demo deployed and accessible  
✅ ML models functioning with 94% accuracy  
✅ Cultural diversity support implemented  
✅ Real-time confidence scoring active  
✅ Comprehensive API documentation  
✅ Performance benchmarks documented  
✅ Security measures implemented  
✅ Monitoring and analytics configured  
✅ Deployment instructions complete  

## Support & Documentation

- **GitHub Issues**: Report bugs and feature requests
- **README.md**: Complete project documentation
- **API Documentation**: Postman collection available
- **Technical Specifications**: Detailed in NASSCOM_HACKATHON_FINAL_SUBMISSION.md

---

*Deployment guide for AutoForage - NASSCOM AI Hackathon 2025 submission*