# AWS Amplify Deployment Guide

## Your Amplify App
- **URL**: https://main.d2pm6kysyy37o2.amplifyapp.com/

## Setup Steps Completed

✅ Created `amplify.yml` build configuration
✅ Updated Cognito callback URLs to include production domain
✅ Configured app to build from `cognito-app/` subdirectory

## Required: Update Google OAuth

You need to add the production URL to your Google OAuth configuration:

### 1. Go to Google Cloud Console
https://console.cloud.google.com/apis/credentials

### 2. Click on your OAuth client "Web client 1"

### 3. Under "Authorized redirect URIs", add this URL:
```
https://bnuwan-sample-app.auth.us-east-2.amazoncognito.com/oauth2/idpresponse
```
(This should already be there)

### 4. Click Save

### 5. Wait for propagation (1-2 minutes)

## Deploy to Amplify

Now commit and push the changes:

```bash
git add .
git commit -m "Add Amplify configuration for deployment"
git push
```

AWS Amplify will automatically:
1. Detect the new commit
2. Build the app from `cognito-app/` directory
3. Deploy to https://main.d2pm6kysyy37o2.amplifyapp.com/

## Build Configuration

The `amplify.yml` file tells Amplify:
- App is in `cognito-app/` subdirectory
- Run `npm ci` to install dependencies
- Run `npm run build` to build
- Deploy files from `dist/` directory

## After Deployment

Once deployed, test:
1. Visit https://main.d2pm6kysyy37o2.amplifyapp.com/
2. Click "Continue with Google"
3. Sign in should work!

## Troubleshooting

If you see 404:
- Check Amplify build logs in AWS Console
- Verify the build completed successfully
- Check that `dist/` folder was created

If Google login fails:
- Verify redirect URI is added in Google Cloud Console
- Wait 5 minutes for changes to propagate
- Check browser console for errors
