// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';
import AWS from 'aws-sdk/global';

// SHARED IMPORTS
import { validateRequestSchema } from '../../shared/middleware';

// LOCAL IMPORTS
import * as interfaces from './interfaces';
import * as schemas from './schemas';
import * as handlers from './handlers';

// Setup component router.
export const authRoute = '/auth';
export const authRouter = Router();

// Setup AWS config region.
AWS.config.region = process.env.AWS_COGNITO_REGION;

// Ping
authRouter.get('/ping', (_: Request, response: Response): void => {
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Sign Up
authRouter.post(
  '/signup',
  validateRequestSchema(schemas.SignUpRequestBodySchema),
  (request: interfaces.SignUpRequest, response: Response): void => {
    handlers.signUpRequestHandler(request, response);
  }
);

// Verify Account
authRouter.post(
  '/verify-account',
  validateRequestSchema(schemas.VerifyAccountRequestBodySchema),
  (request: interfaces.VerifyAccountRequest, response: Response): void => {
    handlers.verifyAccountRequestHandler(request, response);
  }
);

// Sign In
authRouter.post(
  '/signin',
  validateRequestSchema(schemas.SignInRequestBodySchema),
  (request: interfaces.SignInRequest, response: Response): void => {
    handlers.signInRequestHandler(request, response);
  }
);

// Forgot Password
authRouter.post(
  '/forgot-password',
  validateRequestSchema(schemas.ForgotPasswordRequestBodySchema),
  (request: interfaces.ForgotPasswordRequest, response: Response): void => {
    handlers.forgotPasswordRequestHandler(request, response);
  }
);

// Confirm New Password
authRouter.post(
  '/confirm-new-password',
  validateRequestSchema(schemas.ConfirmNewPasswordRequestBodySchema),
  (request: interfaces.ConfirmNewPasswordRequest, response: Response): void => {
    handlers.confirmNewPasswordHandler(request, response);
  }
);

// Refresh Token
authRouter.post(
  '/refresh-token',
  validateRequestSchema(schemas.RefreshTokenRequestBodySchema),
  (request: interfaces.RefreshTokenRequest, response: Response): void => {
    handlers.refreshTokenRequestHandler(request, response);
  }
);

// Sign Out
authRouter.post(
  '/signout',
  validateRequestSchema(schemas.SignOutRequestBodySchema),
  (request: interfaces.SignOutRequest, response: Response): void => {
    handlers.signOutRequestHandler(request, response);
  }
);
