# Deployment Guide

## Free Deployment Setup

This guide shows how to deploy PR Review AI for **completely free** using Railway (backend) and Vercel (frontend).

---

## Prerequisites

- GitHub account
- Railway account (free tier)
- Vercel account (free tier)
- Your LLM API key (Gemini or OpenAI)

---

## Part 1: Deploy Backend to Railway (FREE)

### Step 1: Sign Up for Railway
1. Go to https://railway.app/
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`hamza7malik/pr-review-ai`**
4. Railway will detect your repository

### Step 3: Configure Backend Service
1. Railway will show your repo - click **"Add variables"**
2. Add these environment variables:

```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your-actual-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
PORT=4000
NODE_ENV=production
```

3. Click **"Settings"** → Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `yarn start`
   - **Watch Paths**: `backend/**`

4. Click **"Deploy"**

### Step 4: Get Your Backend URL
1. Once deployed, Railway will give you a URL like:
   ```
   https://pr-review-ai-production-xxxx.up.railway.app
   ```
2. **Copy this URL** - you'll need it for Vercel

### Step 5: Enable CORS (Important!)
Railway automatically handles this, but verify your backend logs show:
```
🚀 Server running on port 4000
```

---

## Part 2: Deploy Frontend to Vercel (FREE)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com/
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **`hamza7malik/pr-review-ai`** and click **"Import"**

### Step 3: Configure Build Settings
Vercel will auto-detect Vite. Update these settings:

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `yarn build`
- **Output Directory**: `dist`
- **Install Command**: `yarn install`

### Step 4: Add Environment Variable
Click **"Environment Variables"** and add:

```
VITE_API_BASE_URL=https://your-railway-url.up.railway.app
```

Replace with your actual Railway backend URL from Part 1, Step 4.

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. Vercel will give you a URL like:
   ```
   https://pr-review-ai.vercel.app
   ```

---

## Part 3: Test Your Deployment

1. **Visit your Vercel URL**: `https://pr-review-ai.vercel.app`
2. **Enter a public PR URL**: `https://github.com/facebook/react/pull/28000`
3. **Click "Review PR"**
4. **Wait for results** (30-60 seconds)

### Troubleshooting

**Frontend shows connection error?**
- Check `VITE_API_BASE_URL` in Vercel environment variables
- Make sure Railway backend URL is correct (no trailing slash)

**Backend not responding?**
- Check Railway logs for errors
- Verify environment variables are set correctly
- Check if service is running (Railway dashboard)

**Rate limit errors?**
- You're hitting GitHub's 60 requests/hour limit
- This is expected for free tier without GitHub token

---

## Cost Breakdown

### Railway (Backend)
- ✅ **FREE**: $5 credit/month (renews automatically)
- ✅ Enough for ~500 hours of runtime
- ✅ Handles 100-1000 requests/day easily

### Vercel (Frontend)
- ✅ **FREE**: Hobby tier
- ✅ Unlimited bandwidth
- ✅ 100 GB-hours compute/month
- ✅ Perfect for personal projects

### LLM API (Gemini)
- ✅ **FREE**: 15 requests/minute
- ✅ 1,500 requests/day
- ✅ Enough for testing and light usage

### GitHub API (Without Token)
- ✅ **FREE**: 60 requests/hour
- ⚠️ Shared across all users
- 💡 Tip: Add GitHub token for 5,000/hour

---

## Custom Domain (Optional)

### For Frontend (Vercel)
1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your domain (e.g., `prreview.ai`)
4. Update DNS records as instructed

### For Backend (Railway)
1. Go to Railway project settings
2. Click **"Settings"** → **"Domains"**
3. Add custom domain
4. Update DNS CNAME record

---

## Auto-Deploy Setup

Both Railway and Vercel support auto-deploy from GitHub:

### Enable Auto-Deploy
1. **Railway**: Already enabled by default for `main` branch
2. **Vercel**: Already enabled by default for `main` branch

### Workflow
1. Push to `develop` branch for testing
2. Merge to `main` branch for production
3. Both services automatically deploy within 2-3 minutes

---

## Monitoring

### Railway Monitoring
- View logs: Railway Dashboard → Your Project → Logs
- Check metrics: CPU, Memory, Network usage
- Set up alerts for crashes

### Vercel Monitoring
- View deployments: Vercel Dashboard → Deployments
- Check analytics: Traffic, performance
- Review build logs

---

## Scaling (When Needed)

### If You Exceed Free Tier:

**Railway**: Upgrade to Hobby ($5/month)
- 500 more hours
- Better performance

**Vercel**: Stay on free tier (it's generous!)

**LLM API**: 
- Gemini Pro: ~$0.001 per request
- OpenAI GPT-4: ~$0.03 per request

---

## Security Notes

1. **Never commit `.env` files** (already in `.gitignore`)
2. **Use environment variables** for all secrets
3. **Rotate API keys** regularly
4. **Monitor usage** to avoid surprises

---

## Support

- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- Project Issues: https://github.com/hamza7malik/pr-review-ai/issues
