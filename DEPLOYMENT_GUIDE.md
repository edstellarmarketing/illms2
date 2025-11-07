# Deployment Guide - Invensis Learning LMS

This guide will walk you through deploying your Invensis Learning LMS to GitHub and Vercel.

## Prerequisites

Before you begin, make sure you have:

- [ ] A GitHub account (create one at https://github.com/signup)
- [ ] A Vercel account (create one at https://vercel.com/signup - you can sign up with GitHub)
- [ ] Git installed on your computer
  - Check by running: `git --version`
  - If not installed, download from: https://git-scm.com/downloads
- [ ] Your Supabase database set up (follow SETUP_INSTRUCTIONS.md)

---

## Part 1: Deploy to GitHub

### Step 1: Initialize Git Repository Locally

Open your terminal/command prompt in your project folder and run:

```bash
git init
```

This creates a new Git repository in your project folder.

### Step 2: Add All Files to Git

```bash
git add .
```

This stages all your files for commit.

### Step 3: Create Your First Commit

```bash
git commit -m "Initial commit - Invensis Learning LMS"
```

This saves your files to the local Git repository.

### Step 4: Create a New Repository on GitHub

1. Go to https://github.com
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `invensis-learning-lms` (or your preferred name)
   - **Description:** "Learning Management System for Invensis Learning"
   - **Visibility:** Choose Public or Private
   - **DO NOT** check "Add a README file" (we already have our code)
   - **DO NOT** add .gitignore or license yet
5. Click **"Create repository"**

### Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Copy and run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/invensis-learning-lms.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/vijay/invensis-learning-lms.git
git branch -M main
git push -u origin main
```

You may be prompted to enter your GitHub credentials.

### Step 6: Verify Upload

1. Go to your GitHub repository URL: `https://github.com/YOUR_USERNAME/invensis-learning-lms`
2. You should see all your project files listed

✅ **GitHub deployment complete!**

---

## Part 2: Deploy to Vercel

### Step 1: Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. On the Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"invensis-learning-lms"** (or your repository name)
4. Click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect that this is a Vite/React project. You should see:

- **Framework Preset:** Vite
- **Root Directory:** ./
- **Build Command:** (leave as default - usually `npm run build` or `vite build`)
- **Output Directory:** (leave as default - usually `dist`)

**Important: Environment Variables**

Since your Supabase credentials are hardcoded in the app, you don't need to add environment variables for this deployment. However, for production apps, it's recommended to use environment variables.

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will start building your application
3. This process takes 1-3 minutes
4. You'll see a build log showing the progress

### Step 5: Verify Deployment

Once deployment is complete:

1. You'll see a **"Congratulations"** screen with confetti 🎉
2. Click **"Visit"** to open your live application
3. Your app will be available at a URL like: `https://invensis-learning-lms.vercel.app`

✅ **Vercel deployment complete!**

---

## Part 3: Testing Your Deployed Application

### Test Student Portal

1. Go to your Vercel URL
2. Click **"Student Portal"**
3. Sign up with a test account
4. Verify you can see the 3 sample resources
5. Test logout functionality

### Test Admin Console

1. Go back to home
2. Click **"Admin Console"**
3. Login with:
   - Email: `vijay@edstellar.com`
   - Password: `admin123`
4. Test adding, editing, and deleting resources
5. Test logout functionality

---

## Part 4: Custom Domain (Optional)

### Add a Custom Domain to Vercel

1. In your Vercel project dashboard, click **"Settings"**
2. Click **"Domains"** in the left sidebar
3. Enter your custom domain (e.g., `lms.invensislearning.com`)
4. Follow Vercel's instructions to update your DNS settings
5. Once verified, your app will be available at your custom domain

---

## Part 5: Making Updates

### When You Make Changes to Your Code

1. **Save your changes** in your code editor

2. **Add changes to Git:**
   ```bash
   git add .
   ```

3. **Commit the changes:**
   ```bash
   git commit -m "Description of changes"
   ```
   
   Example:
   ```bash
   git commit -m "Added new features to admin dashboard"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

5. **Automatic Deployment:**
   - Vercel automatically detects the changes on GitHub
   - It will rebuild and redeploy your app automatically
   - You'll receive an email notification when deployment is complete
   - Check the Vercel dashboard to see deployment status

---

## Troubleshooting

### Issue: Git push rejected

**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Issue: Vercel build fails - "No Output Directory named 'dist' found"

**This is the most common error!**

**Solution:**
The required configuration files have been added to your project:
- `vite.config.ts`
- `vercel.json`
- `package.json`
- `index.html`
- `main.tsx`
- `tsconfig.json`
- `postcss.config.js`

You need to commit and push these files:

```bash
git add .
git commit -m "Add Vercel configuration files"
git push origin main
```

Vercel will automatically detect the new push and redeploy. The build should succeed now!

### Issue: Vercel build fails (other reasons)

**Common causes:**
- Check the build logs in Vercel dashboard
- Ensure all dependencies are listed in package.json
- Verify there are no syntax errors in your code

**Solution:**
1. Go to Vercel dashboard → Your project → Deployments
2. Click on the failed deployment
3. Read the error logs
4. Fix the error in your code
5. Push changes to GitHub (Vercel will auto-redeploy)

### Issue: Supabase connection not working

**Solution:**
- Verify your Supabase URL and API key in `/lib/supabase.ts`
- Check that your Supabase tables are created (see SETUP_INSTRUCTIONS.md)
- Verify Row Level Security policies are enabled

### Issue: Resources not loading

**Solution:**
- Open browser console (F12) to check for errors
- Verify Supabase tables have the sample data
- Check that the resources table exists and has data

---

## Environment Variables (For Production - Optional)

For better security, you should move your Supabase credentials to environment variables:

### Step 1: Update Your Code

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://npgmkbmebansnxltkkzk.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Update `/lib/supabase.ts`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### Step 2: Add to Vercel

1. Go to Vercel dashboard → Your project → Settings
2. Click **"Environment Variables"**
3. Add:
   - `VITE_SUPABASE_URL` = `https://npgmkbmebansnxltkkzk.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your_anon_key_here`
4. Click **"Save"**
5. Redeploy your application

### Step 3: Update .gitignore

Create/update `.gitignore` file:

```
.env
.env.local
node_modules
dist
```

This prevents sensitive data from being committed to GitHub.

---

## Quick Reference Commands

### Git Commands
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### View Your Deployments
- **GitHub Repository:** `https://github.com/YOUR_USERNAME/invensis-learning-lms`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **Live Application:** Check your Vercel dashboard for the URL

---

## Support Resources

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com
- **Vercel Documentation:** https://vercel.com/docs
- **Supabase Documentation:** https://supabase.com/docs

---

## Summary Checklist

- [ ] Initialized Git repository locally
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Created Vercel account
- [ ] Imported project to Vercel
- [ ] Deployed to Vercel successfully
- [ ] Tested student portal
- [ ] Tested admin console
- [ ] Verified resources loading correctly
- [ ] (Optional) Set up custom domain
- [ ] (Optional) Configured environment variables

**Congratulations! Your Invensis Learning LMS is now live! 🎉**

Share your Vercel URL with students and administrators to start using the platform.