#!/bin/bash

echo "🚀 Setting up GitHub Repository for NASSCOM Submission"
echo "====================================================="

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required."
    exit 1
fi

REPO_NAME="autoforage-nasscom-hackathon"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME"

echo ""
echo "📋 Repository Details:"
echo "Username: $GITHUB_USERNAME"
echo "Repository: $REPO_NAME"
echo "URL: $REPO_URL"
echo ""

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding all files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: AutoForage NASSCOM Hackathon 2025 submission

Privacy-First AI Agentic System for Track 2: Privacy-Preserving AI
- Advanced PII detection and redaction engine
- Real-time agent processing with sanitized inputs
- Production-ready deployment configurations
- Professional UI with NASSCOM branding
- Complete documentation and setup guides

Built by: $GITHUB_USERNAME
Portfolio: https://superprofile.bio/vp/forage-library
Hackathon: NASSCOM AI Hackathon 2025 - Track 2"

# Set remote origin
echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL.git"

echo ""
echo "✅ Git repository setup complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Create repository on GitHub:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: $REPO_NAME"
echo "   - Description: Privacy-First AI Agentic System for NASSCOM AI Hackathon 2025 - Track 2"
echo "   - Make it PUBLIC (required for hackathon)"
echo "   - Do NOT initialize with README"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Railway:"
echo "   - Go to: https://railway.app"
echo "   - Sign in with GitHub"
echo "   - New Project → Deploy from GitHub repo"
echo "   - Select: $REPO_NAME"
echo ""
echo "🎯 Repository URL: $REPO_URL"
echo "🚀 Ready for NASSCOM submission!"