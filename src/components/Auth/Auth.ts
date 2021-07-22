// EXTERNAL IMPORTS
import { Router, Request, Response } from 'express';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
  AuthenticationDetails,
  CodeDeliveryDetails,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk/global';
import jwtDecode from 'jwt-decode';

// SHARED IMPORTS
import { validateRequestSchema } from '../../shared/middlewares';

// LOCAL IMPORTS
import * as types from './types';
import * as schemas from './schemas';

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
  response.status(200).json({ message: 'pong' });
});

// Sign Up
authRouter.post(
  '/signup',
  validateRequestSchema(schemas.SignUpRequestBodySchema),
  (request: Request, response: Response): void => {
    const user: types.SignUpRequestBodyType = request.body;

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: user.name
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: user.email
      }),
      new CognitoUserAttribute({
        Name: 'updated_at',
        Value: Date.now().toString()
      })
    ];

    userPool.signUp(
      user.username,
      user.password,
      attributeList,
      null,
      (error: Error, _: ISignUpResult): void => {
        if (error != null) {
          switch (error.name) {
            case 'UsernameExistsException':
              response.status(409).json({ message: 'Account already exists.' });
              break;
            default:
              break;
          }
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
  validateRequestSchema(schemas.VerifyAccountRequestBodySchema),
  (request: Request, response: Response): void => {
    const user: types.VerifyAccountRequestBodyType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: userPool
    });

    cognitoUser.confirmRegistration(
      user.confirmation_code,
      true,
      (error: Error, _: ISignUpResult): void => {
        if (error != null) {
          switch (error.name) {
            case 'ExpiredCodeException':
              response.status(410).json({ message: 'Confirmation code has expired.' });
              break;
            case 'CodeMismatchException':
              response.status(400).json({ message: 'Confirmation code is invalid.' });
              break;
            case 'NotAuthorizedException':
              response.status(401).json({ message: 'Account is not authorized.' });
              break;
            default:
              break;
          }
        } else {
          response.status(200).json({ message: 'Account verified.' });
        }
      }
    );
  }
);

// Sign In
authRouter.post(
  '/signin',
  validateRequestSchema(schemas.SignInRequestBodySchema),
  (request: Request, response: Response): void => {
    const user: types.SignInRequestBodyType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: userPool
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: user.username,
      Password: user.password
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession): void => {
        response.cookie('refresh_token', session.getRefreshToken().getToken(), {
          httpOnly: true,
          secure: false
        });
        response.status(200).json({
          message: 'Sign in successful.',
          id_token: session.getIdToken().getJwtToken(),
          access_token: session.getAccessToken().getJwtToken()
        });
      },
      onFailure: (error: Error): void => {
        switch (error.name) {
          case 'NotAuthorizedException':
            response.status(401).json({ message: 'Incorrect username or password.' });
            break;
          default:
            response.status(500).json({ message: 'Uh-oh. Server error.' });
            break;
        }
      }
    });
  }
);

// Forgot Password
authRouter.post(
  '/forgot-password',
  validateRequestSchema(schemas.ForgotPasswordRequestBodySchema),
  (request: Request, response: Response): void => {
    const user: types.ForgotPasswordRequestBodyType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: userPool
    });

    cognitoUser.forgotPassword({
      onSuccess: (data: { CodeDeliveryDetails: CodeDeliveryDetails }): void => {
        response.status(200).json({
          message: `A verification code to reset your password has been sent your email: ${data.CodeDeliveryDetails.Destination}`
        });
      },
      onFailure: (error: Error): void => {
        switch (error.name) {
          case 'LimitExceededException':
            response.status(500).json({ message: 'Uh-oh. Server error.' });
            break;
          default:
            response.status(400).json({ message: 'Username provided does not exist.' });
            break;
        }
      }
    });
  }
);

// Confirm New Password
authRouter.post(
  '/confirm-new-password',
  validateRequestSchema(schemas.ConfirmNewPasswordRequestBodySchema),
  (request: Request, response: Response): void => {
    const user: types.ConfirmNewPasswordRequestBodyType = request.body;

    const cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: userPool
    });

    cognitoUser.confirmPassword(user.verification_code, user.new_password, {
      onSuccess: (): void => {
        response.status(200).json({
          message: 'Password updated.'
        });
      },
      onFailure: (error: Error): void => {
        switch (error.name) {
          case 'CodeMismatchException':
            response.status(401).json({ message: 'Invalid verification code.' });
            break;
          case 'ExpiredCodeException':
            response.status(400).json({ message: 'Verification code expired.' });
            break;
          default:
            response.status(500).json({ message: 'Uh-oh. Server error.' });
            break;
        }
      }
    });
  }
);

// Refresh Token
authRouter.post(
  '/refresh-token',
  validateRequestSchema(schemas.RefreshTokenRequestBodySchema),
  (request: Request, response: Response): void => {
    const tokens: types.RefreshTokenRequestBodyType = request.body;
    const cookies: types.RefreshTokenRequestCookieType = request.cookies;

    const session = new CognitoUserSession({
      IdToken: new CognitoIdToken({ IdToken: tokens.id_token }),
      AccessToken: new CognitoAccessToken({ AccessToken: tokens.access_token }),
      RefreshToken: new CognitoRefreshToken({ RefreshToken: cookies.refresh_token })
    });

    // TO DO: Implement proper token validation and refresh.
    if (session.isValid()) {
      response.status(200).json({ message: 'Tokens are valid.' });
    } else {
      response.status(401).json({ message: 'Tokens are invalid.' });
    }
  }
);

// Sign Out
authRouter.post(
  '/signout',
  validateRequestSchema(schemas.SignOutRequestBodySchema),
  (request: Request, response: Response): void => {
    const tokens: types.SignOutRequestBodyType = request.body;
    const cookies: types.SignOutRequestCookieType = request.cookies;

    const session = new CognitoUserSession({
      IdToken: new CognitoIdToken({ IdToken: tokens.id_token }),
      AccessToken: new CognitoAccessToken({ AccessToken: tokens.access_token }),
      RefreshToken: new CognitoRefreshToken({ RefreshToken: cookies.refresh_token })
    });

    // TO DO: Track the issue regarding `.signOut()` not revoking tokens.
    if (session.isValid()) {
      const idTokenDecodedType: types.IdTokenDecodedType = jwtDecode(tokens.id_token);
      const cognitoUser = new CognitoUser({
        Username: idTokenDecodedType['cognito:username'],
        Pool: userPool
      });
      cognitoUser.signOut();
      response.status(200).json({ message: 'Sign out successful.' });
    } else {
      response.status(401).json({ message: 'Tokens are invalid.' });
    }
  }
);
