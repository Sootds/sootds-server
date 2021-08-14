// EXTERNAL IMPORTS
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const UserPool = new CognitoUserPool({
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID
});
