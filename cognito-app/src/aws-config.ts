// AWS Amplify Configuration
// AWS Cognito User Pool Details

import type { ResourcesConfig } from 'aws-amplify';

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_3LwQwPkD4',
      userPoolClientId: 'id7la3ikg2o4vnpuftvl9gmmv',
      loginWith: {
        oauth: {
          domain: 'bnuwan-sample-app.auth.us-east-2.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:5173/', 'https://main.d2pm6kysyy37o2.amplifyapp.com/'],
          redirectSignOut: ['http://localhost:5173/', 'https://main.d2pm6kysyy37o2.amplifyapp.com/'],
          responseType: 'code' as const,
          providers: [{ custom: 'Google' }, { custom: 'Facebook' }]
        }
      }
    }
  }
};
