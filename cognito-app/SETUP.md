# AWS Cognito Login with Google & Facebook - Setup Guide

This React application provides authentication using AWS Cognito with Google and Facebook social sign-in.

## Prerequisites

- Node.js (v16 or higher)
- AWS Account
- Google Cloud Console account (for Google OAuth)
- Facebook Developer account (for Facebook OAuth)

## AWS Cognito Setup

### 1. Create a Cognito User Pool

1. Go to AWS Console → Amazon Cognito
2. Click "Create user pool"
3. Configure sign-in experience:
   - Select "Email" as sign-in option
   - Click "Next"
4. Configure security requirements (use defaults or customize)
5. Configure sign-up experience (use defaults or customize)
6. Configure message delivery (use defaults)
7. Integrate your app:
   - User pool name: `cognito-sample-pool` (or your choice)
   - App type: Public client
   - App client name: `cognito-sample-client`
   - **IMPORTANT**: Under "Hosted UI settings"
     - Select "Use Cognito Hosted UI"
     - Cognito domain: Choose a unique domain prefix (e.g., `your-app-name-123`)
     - Callback URLs: `http://localhost:5173/`
     - Sign out URLs: `http://localhost:5173/`
     - OAuth 2.0 grant types: Select "Authorization code grant"
     - OpenID Connect scopes: Select `openid`, `email`, `profile`
8. Review and create

### 2. Configure Google Sign-In

#### A. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. Configure consent screen if prompted
6. Application type: "Web application"
7. Authorized redirect URIs: Add:
   ```
   https://YOUR_COGNITO_DOMAIN.auth.YOUR_REGION.amazoncognito.com/oauth2/idpresponse
   ```
   Example: `https://your-app-name-123.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
8. Copy the Client ID and Client Secret

#### B. Add Google to Cognito

1. In Cognito User Pool → "Sign-in experience" tab
2. Click "Add identity provider"
3. Select "Google"
4. Enter:
   - Google app ID: Your Google Client ID
   - App secret: Your Google Client Secret
   - Authorized scopes: `profile email openid`
5. Map attributes:
   - email → email
   - name → name
   - picture → picture
6. Save changes
7. Go to "App integration" tab → Select your app client
8. Edit "Hosted UI" settings and enable Google as identity provider

### 3. Configure Facebook Sign-In

#### A. Get Facebook App Credentials

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing one
3. Add "Facebook Login" product
4. Go to Settings → Basic
5. Copy App ID and App Secret
6. Add platform: "Website"
7. Site URL: `https://YOUR_COGNITO_DOMAIN.auth.YOUR_REGION.amazoncognito.com`
8. In Facebook Login settings:
   - Valid OAuth Redirect URIs: Add:
     ```
     https://YOUR_COGNITO_DOMAIN.auth.YOUR_REGION.amazoncognito.com/oauth2/idpresponse
     ```
9. Make app live (in Settings → Basic, toggle app mode to "Live")

#### B. Add Facebook to Cognito

1. In Cognito User Pool → "Sign-in experience" tab
2. Click "Add identity provider"
3. Select "Facebook"
4. Enter:
   - Facebook app ID: Your Facebook App ID
   - App secret: Your Facebook App Secret
   - Authorized scopes: `public_profile,email`
5. Map attributes:
   - email → email
   - name → name
   - picture → picture
6. Save changes
7. Go to "App integration" tab → Select your app client
8. Edit "Hosted UI" settings and enable Facebook as identity provider

## Application Configuration

### Update AWS Configuration

Edit `src/aws-config.ts` and replace the placeholder values:

```typescript
export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_ABC123DEF', // From Cognito User Pool
      userPoolClientId: '1a2b3c4d5e6f7g8h9i0j1k2l3m', // From App Client
      loginWith: {
        oauth: {
          domain: 'your-app-name-123.auth.us-east-1.amazoncognito.com', // From Cognito domain
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:5173/'],
          redirectSignOut: ['http://localhost:5173/'],
          responseType: 'code' as const,
          providers: [{ custom: 'Google' }, { custom: 'Facebook' }]
        }
      }
    }
  }
};
```

### Where to Find Values:

1. **userPoolId**:
   - Cognito → User pools → Your pool → "User pool overview"
   - Look for "User pool ID"

2. **userPoolClientId**:
   - Cognito → User pools → Your pool → "App integration" tab
   - Under "App clients and analytics", click your app client
   - Copy "Client ID"

3. **domain**:
   - Cognito → User pools → Your pool → "App integration" tab
   - Under "Domain", copy the Cognito domain
   - Format: `your-domain.auth.region.amazoncognito.com`

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Testing Authentication

1. Click "Continue with Google" or "Continue with Facebook"
2. You'll be redirected to the provider's login page
3. After successful authentication, you'll be redirected back to the app
4. The Home page will display your user information
5. Click "Sign Out" to log out

## Production Deployment

When deploying to production:

1. Update callback URLs in:
   - AWS Cognito app client settings
   - Google OAuth credentials
   - Facebook app settings

2. Update `redirectSignIn` and `redirectSignOut` in `src/aws-config.ts`:
   ```typescript
   redirectSignIn: ['https://your-production-domain.com/'],
   redirectSignOut: ['https://your-production-domain.com/'],
   ```

## Troubleshooting

### "Invalid redirect_uri" Error
- Ensure callback URLs match exactly in Cognito, Google, and Facebook
- Check for trailing slashes - they must match

### Provider Not Appearing
- Verify the identity provider is enabled in the app client's Hosted UI settings
- Check that attribute mappings are configured

### "Invalid client" Error
- Verify userPoolClientId is correct
- Ensure the app client exists and is properly configured

### CORS Errors
- Check that your domain is listed in the allowed origins
- Verify redirect URIs are correctly configured

## File Structure

```
src/
├── components/
│   ├── Login.tsx          # Login page with social sign-in buttons
│   ├── Login.css          # Login page styles
│   ├── Home.tsx           # Protected home page
│   └── Home.css           # Home page styles
├── aws-config.ts          # AWS Amplify configuration
├── App.tsx                # Main app component with auth logic
└── main.tsx               # App entry point
```

## Additional Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login](https://developers.facebook.com/docs/facebook-login)
