# AutoForage - NASSCOM Hackathon Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway link
railway up
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 3: Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create autoforage-nasscom

# Deploy
git push heroku main
```

### Option 4: Docker (Any Platform)
```bash
# Build and run
docker build -t autoforage .
docker run -p 3000:3000 autoforage
```

## 📦 Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables (Optional)
- `NODE_ENV`: production/development
- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection (uses memory storage by default)

## 📋 Deployment Checklist
- ✅ All dependencies installed
- ✅ Build scripts configured
- ✅ Health check endpoint (/api/status)
- ✅ Environment variables set
- ✅ Domain configured
- ✅ HTTPS enabled

## 🏆 NASSCOM Submission Links
- **Live Demo**: [Your deployed URL]
- **Source Code**: [Your GitHub repository]
- **Documentation**: This README.md
- **Video Demo**: [Optional - Upload to YouTube/Loom]