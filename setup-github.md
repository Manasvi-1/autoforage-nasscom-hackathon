# 🚀 GitHub Repository Setup for NASSCOM Submission

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" 
3. Repository name: `autoforage-nasscom-hackathon`
4. Description: `Privacy-First AI Agentic System for NASSCOM AI Hackathon 2025 - Track 2`
5. Make it **Public** (required for hackathon submission)
6. Initialize with README: **No** (we have our own)
7. Click "Create repository"

## Step 2: Upload Your Project

### Option A: Using Git (Recommended)
```bash
# In your project directory
git init
git add .
git commit -m "Initial commit: AutoForage NASSCOM Hackathon submission"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/autoforage-nasscom-hackathon.git
git push -u origin main
```

### Option B: GitHub Web Interface
1. On your new repository page, click "uploading an existing file"
2. Drag and drop all your project files
3. Commit message: "AutoForage NASSCOM Hackathon 2025 submission"
4. Click "Commit changes"

## Step 3: Deploy to Railway (Easiest)

1. Go to [Railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `autoforage-nasscom-hackathon` repository
6. Railway will auto-detect and deploy
7. Your app will be live at: `https://autoforage-nasscom-[random].up.railway.app`

## Step 4: Update Links

After deployment, update these files with your actual URLs:

### Update README.md
Replace these placeholders:
- `https://autoforage-production.up.railway.app` → Your Railway URL
- `https://manasvi-gowda.github.io/autoforage` → Your GitHub Pages URL  
- `https://github.com/manasvi-gowda/autoforage` → Your repository URL

### Update NASSCOM_HACKATHON_SUBMISSION.md
Replace these placeholders:
- `[DEPLOY_URL_HERE]` → Your Railway URL
- `[GITHUB_REPO_URL]` → Your repository URL
- `[YOUTUBE_URL]` → Your video demo URL (optional)

## Step 5: Enable GitHub Pages (Optional Frontend-only Demo)

1. In your repository, go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: /client/dist (after building)
5. Save

## Step 6: Final Checklist

- [ ] Repository is public
- [ ] All files uploaded successfully  
- [ ] README.md updated with correct URLs
- [ ] Application deployed and accessible
- [ ] All features tested and working
- [ ] NASSCOM submission document ready

## 🏆 Your Submission URLs

After completing setup, you'll have:

- **GitHub Repository:** `https://github.com/YOUR_USERNAME/autoforage-nasscom-hackathon`
- **Live Demo:** `https://autoforage-nasscom-[id].up.railway.app`
- **Documentation:** Available in repository README.md
- **Submission Form:** Use NASSCOM_HACKATHON_SUBMISSION.md for details

## 📝 NASSCOM Submission Form Fields

Use these details for the hackathon submission form:

- **Project Name:** AutoForage - Privacy-First AI Agentic System
- **Track:** Track 2: Privacy-Preserving AI – Deidentification of Visual Data  
- **Team Lead:** Manasvi Gowda P
- **Live Demo URL:** [Your Railway deployment URL]
- **Source Code URL:** [Your GitHub repository URL]
- **Video Demo:** [Optional YouTube/Loom URL]
- **Description:** Advanced privacy-preserving AI system with multi-layer PII detection, real-time agent processing, and production-ready deployment. Built for immediate fintech/healthcare applications with open-source contribution.

## 🎯 Ready to Submit!

Your complete AutoForage project is now ready for NASSCOM AI Hackathon 2025 submission with:

✅ **Production-ready privacy-first AI system**  
✅ **Complete GitHub repository with documentation**  
✅ **Live deployment with working demo**  
✅ **Professional submission package**  
✅ **Track 2 requirements fully met**

**Time to win that INR 6 Lakh prize!** 🏆