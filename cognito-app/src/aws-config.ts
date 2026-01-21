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
          redirectSignIn: ['http://localhost:5173/'],
          redirectSignOut: ['http://localhost:5173/'],
          responseType: 'code' as const,
          providers: [{ custom: 'Google' }, { custom: 'Facebook' }]
        }
      }
    }
  }
};
