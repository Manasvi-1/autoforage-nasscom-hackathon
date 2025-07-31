#!/bin/bash

echo "🚀 AutoForage Deployment Script"
echo "==============================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Build the application
echo "📦 Building application..."
npm run build

# Deploy based on platform preference
echo ""
echo "Choose deployment platform:"
echo "1) Railway"
echo "2) Vercel"
echo "3) Heroku"
echo "4) GitHub Pages (frontend only)"
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🚄 Deploying to Railway..."
        if command_exists railway; then
            railway login
            railway up
        else
            echo "Install Railway CLI: npm install -g @railway/cli"
        fi
        ;;
    2)
        echo "▲ Deploying to Vercel..."
        if command_exists vercel; then
            vercel --prod
        else
            echo "Install Vercel CLI: npm install -g vercel"
        fi
        ;;
    3)
        echo "🟣 Deploying to Heroku..."
        if command_exists heroku; then
            heroku create autoforage-nasscom
            git push heroku main
        else
            echo "Install Heroku CLI from heroku.com"
        fi
        ;;
    4)
        echo "📄 Setting up for GitHub Pages..."
        echo "1. Push to GitHub repository"
        echo "2. Enable GitHub Pages in repository settings"
        echo "3. Set source to 'client/dist' folder"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process initiated!"
echo "📝 Don't forget to update the live URLs in README.md"