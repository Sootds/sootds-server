import { Router, Request, Response } from 'express';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
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

authRouter.get('/ping', (request: Request, response: Response): void => {
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

    userPool.signUp(user.user_name, user.password, attributeList, null, (err, result) => {
      if (err) {
        response.json({ message: err.message, error: JSON.stringify(err) });
      }
      response.json({ user_name: result.user.getUsername() });
    });
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

    cognitoUser.confirmRegistration(user.confirmation_code, true, (err, result) => {
      if (err) {
        response.json({ message: err.message, error: JSON.stringify(err) });
      }
      response.json({ message: JSON.stringify(result) });
    });
  }
);
