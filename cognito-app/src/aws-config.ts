// AWS Amplify Configuration
// Replace these values with your actual AWS Cognito configuration

import type { ResourcesConfig } from 'aws-amplify';

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'YOUR_USER_POOL_ID', // e.g., us-east-1_xxxxxx
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID', // e.g., 1a2b3c4d5e6f7g8h9i0j1k2l3m
      loginWith: {
        oauth: {
          domain: 'YOUR_COGNITO_DOMAIN', // e.g., your-app-domain.auth.us-east-1.amazoncognito.com
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:5173/'], // Update with your production URL
          redirectSignOut: ['http://localhost:5173/'], // Update with your production URL
          responseType: 'code' as const,
          providers: [{ custom: 'Google' }, { custom: 'Facebook' }]
        }
      }
    }
  }
};
