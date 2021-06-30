// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession,
  AuthenticationDetails,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk/global';

// SHARED IMPORTS
import { validateRequestSchema, enableCredentials } from '../../shared/middlewares';

// LOCAL IMPORTS
import { SignUpRequestType, VerifyAccountRequestType, SignInRequestType } from './types';
import { SignUpRequestSchema, VerifyAccountRequestSchema, SignInRequestSchema } from './schemas';

// Setup component router.
export const authRoute = '/auth';
export const authRouter = Router();

// Setup AWS config region.
AWS.config.region = process.env.AWS_COGNITO_REGION;

// Setup AWS Cognito User Pool object.
const userPool = new CognitoUserPool({
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID
});

// Ping
authRouter.get('/ping', (_: Request, response: Response): void => {
  response.send('pong');
});

// Sign Up
authRouter.post(
  '/signup',
  validateRequestSchema(SignUpRequestSchema),
  (request: Request, response: Response): void => {
    const user: SignUpRequestType = request.body;

    const attributeList = [];
    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: user.email
    });
    attributeList.push(attributeEmail);

    userPool.signUp(
      user.user_name,
      user.password,
      attributeList,
      null,
      (error: Error, _: ISignUpResult): void => {
        if (error.name == 'UsernameExistsException') {
          response.status(409).json({ error: 'Account already exists.' });
        } else {
          response.status(200).json({ message: 'Account created.' });
        }
      }
    );
  }
);

// Verify Account
authRouter.post(
  '/verify-account',
  validateRequestSchema(VerifyAccountRequestSchema),
  (request: Request, response: Response): void => {
    const user: VerifyAccountRequestType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.user_name,
      Pool: userPool
    });

    cognitoUser.confirmRegistration(
      user.confirmation_code,
      true,
      (error: Error, _: ISignUpResult): void => {
        if (error.name == 'ExpiredCodeException') {
          response.status(410).json({ message: 'Confirmation code has expired.' });
        } else if (error.name == 'NotAuthorizedException') {
          response.status(401).json({ message: 'Account is not authorized.' });
        } else if (error.name == 'CodeMismatchException') {
          response.status(400).json({ message: 'Confirmation code is invalid.' });
        } else {
          response.status(200).json({ message: 'Account email confirmed.' });
        }
      }
    );
  }
);

// Sign In
authRouter.post(
  '/signin',
  [validateRequestSchema(SignInRequestSchema), enableCredentials],
  (request: Request, response: Response): void => {
    const user: SignInRequestType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.user_name,
      Pool: userPool
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: user.user_name,
      Password: user.password
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: CognitoUserSession): void => {
        const accessToken = result.getAccessToken();
        response.cookie('access_token', accessToken.getJwtToken(), {
          httpOnly: true,
          maxAge: accessToken.getExpiration()
        });
        response.status(200).json({
          message: 'Sign in successful.',
          access_token: accessToken.getJwtToken(),
          expires_in: accessToken.getExpiration(),
          token_type: 'Bearer'
        });
      },
      onFailure: (error: Error): void => {
        if (error.name == 'NotAuthorizedException') {
          response.status(401).json({ message: 'Incorrect username or password.' });
        } else {
          response.status(500).json({ message: 'Uh-oh. Server error.' });
        }
      }
    });
  }
);
