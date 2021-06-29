import { Router, Request, Response } from 'express';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import { SignUpRequestType, ConfirmAccountRequestType } from './types';
import { SignUpRequestSchema, ConfirmAccountRequestSchema } from './schemas';
import { validateRequestSchema } from '../../middlewares';

export const authRoute = '/auth';
export const authRouter = Router();

// AWS User Pool
const userPool = new CognitoUserPool({
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID
});

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
      (error: Error, _: ISignUpResult) => {
        if (error.name == 'UsernameExistsException') {
          response.status(409).json({ error: 'Account already exists.' });
        } else {
          response.status(200).json({ message: 'Account created.' });
        }
      }
    );
  }
);

// Confirm Account
authRouter.post(
  '/confirm-account',
  validateRequestSchema(ConfirmAccountRequestSchema),
  (request: Request, response: Response): void => {
    const user: ConfirmAccountRequestType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.user_name,
      Pool: userPool
    });

    cognitoUser.confirmRegistration(
      user.confirmation_code,
      true,
      (error: Error, result: ISignUpResult) => {
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
