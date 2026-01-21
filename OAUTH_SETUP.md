# OAuth Provider Setup Instructions

## AWS Cognito Configuration Created ✅

Your Cognito setup is ready:
- **User Pool ID**: `us-east-2_3LwQwPkD4`
- **Client ID**: `id7la3ikg2o4vnpuftvl9gmmv`
- **Domain**: `bnuwan-sample-app.auth.us-east-2.amazoncognito.com`
- **Region**: `us-east-2`

## Required: Get OAuth Credentials

You need to get credentials from Google and Facebook to complete the setup.

---

## 1. Google OAuth Setup

### Step 1: Get Google Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. If prompted, configure the consent screen first:
   - User Type: External
   - App name: Cognito Sample App
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: Add `email`, `profile`, `openid`
   - Save and continue

6. Create OAuth client ID:
   - Application type: **Web application**
   - Name: `Cognito Sample App`
   - Authorized redirect URIs: **ADD THIS EXACTLY**:
     ```
     https://bnuwan-sample-app.auth.us-east-2.amazoncognito.com/oauth2/idpresponse
     ```
   - Click **Create**

7. **Copy the Client ID and Client Secret** - you'll need these!

### Step 2: Provide Google Credentials

Once you have the Google Client ID and Client Secret, run:

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-2_3LwQwPkD4 \
  --provider-name Google \
  --provider-type Google \
  --provider-details client_id="YOUR_GOOGLE_CLIENT_ID",client_secret="YOUR_GOOGLE_CLIENT_SECRET",authorize_scopes="profile email openid" \
  --attribute-mapping email=email,name=name,picture=picture \
  --region us-east-2
```

Then update the app client to include Google:

```bash
aws cognito-idp update-user-pool-client \
  --user-pool-id us-east-2_3LwQwPkD4 \
  --client-id id7la3ikg2o4vnpuftvl9gmmv \
  --supported-identity-providers "COGNITO" "Google" \
  --region us-east-2
```

---

## 2. Facebook OAuth Setup

### Step 1: Get Facebook Credentials

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select app type: **Consumer** (or Business if applicable)
4. Display name: `Cognito Sample App`
5. App contact email: Your email
6. Click **Create App**

7. In the dashboard, click **Add Product** → Select **Facebook Login**
8. Choose **Web** platform
9. Site URL: `https://bnuwan-sample-app.auth.us-east-2.amazoncognito.com`

10. Go to **Facebook Login** → **Settings**:
    - Valid OAuth Redirect URIs: **ADD THIS EXACTLY**:
      ```
      https://bnuwan-sample-app.auth.us-east-2.amazoncognito.com/oauth2/idpresponse
      ```
    - Save changes

11. Go to **Settings** → **Basic**:
    - **Copy the App ID and App Secret** - you'll need these!
    - Add **Privacy Policy URL** (required): `https://your-website.com/privacy` (you can use a placeholder)
    - Add **Terms of Service URL**: `https://your-website.com/terms`
    - Save changes

12. **Important**: Switch the app to **Live** mode:
    - Top of the page: Toggle from "In Development" to "Live"
    - You may need to provide additional information

### Step 2: Provide Facebook Credentials

Once you have the Facebook App ID and App Secret, run:

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-2_3LwQwPkD4 \
  --provider-name Facebook \
  --provider-type Facebook \
  --provider-details client_id="YOUR_FACEBOOK_APP_ID",client_secret="YOUR_FACEBOOK_APP_SECRET",authorize_scopes="public_profile,email" \
  --attribute-mapping email=email,name=name,picture=picture \
  --region us-east-2
```

Then update the app client to include Facebook:

```bash
aws cognito-idp update-user-pool-client \
  --user-pool-id us-east-2_3LwQwPkD4 \
  --client-id id7la3ikg2o4vnpuftvl9gmmv \
  --supported-identity-providers "COGNITO" "Google" "Facebook" \
  --region us-east-2
```

---

## Quick Reference

### Your Cognito OAuth Redirect URI (use for both Google & Facebook):
```
https://bnuwan-sample-app.auth.us-east-2.amazoncognito.com/oauth2/idpresponse
```

### After configuring both providers:

Your app will be fully configured and ready to use!

---

## Next Steps

1. Get Google OAuth credentials (Client ID & Secret)
2. Get Facebook OAuth credentials (App ID & Secret)
3. Run the AWS CLI commands above with your credentials
4. The application configuration will be automatically updated

Let me know when you have the credentials and I can complete the setup for you!
