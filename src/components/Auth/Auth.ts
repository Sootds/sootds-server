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
import { validateRequestSchema } from '../../shared/middleware';

// LOCAL IMPORTS
import * as interfaces from './interfaces';
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
  response.status(200).json({ message: 'pong', timestamp: Date.now() });
});

// Sign Up
authRouter.post(
  '/signup',
  validateRequestSchema(schemas.SignUpRequestBodySchema),
  (request: interfaces.SignUpRequest, response: Response): void => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: request.body.name
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: request.body.email
      }),
      new CognitoUserAttribute({
        Name: 'updated_at',
        Value: Date.now().toString()
      })
    ];

    userPool.signUp(
      request.body.username,
      request.body.password,
      attributeList,
      null,
      (error: Error, _: ISignUpResult): void => {
        if (error != null) {
          switch (error.name) {
            case 'UsernameExistsException':
              response
                .status(409)
                .json({ message: 'Account already exists.', timestamp: Date.now() });
              break;
            default:
              break;
          }
        } else {
          response.status(200).json({ message: 'Account created.', timestamp: Date.now() });
        }
      }
    );
  }
);

// Verify Account
authRouter.post(
  '/verify-account',
  validateRequestSchema(schemas.VerifyAccountRequestBodySchema),
  (request: interfaces.VerifyAccountRequest, response: Response): void => {
    const cognitoUser = new CognitoUser({
      Username: request.body.username,
      Pool: userPool
    });

    cognitoUser.confirmRegistration(
      request.body.verification_code,
      true,
      (error: Error, _: ISignUpResult): void => {
        if (error != null) {
          switch (error.name) {
            case 'ExpiredCodeException':
              response
                .status(410)
                .json({ message: 'Confirmation code has expired.', timestamp: Date.now() });
              break;
            case 'CodeMismatchException':
              response
                .status(400)
                .json({ message: 'Confirmation code is invalid.', timestamp: Date.now() });
              break;
            case 'NotAuthorizedException':
              response
                .status(401)
                .json({ message: 'Account is not authorized.', timestamp: Date.now() });
              break;
            default:
              break;
          }
        } else {
          response.status(200).json({ message: 'Account verified.', timestamp: Date.now() });
        }
      }
    );
  }
);

// Sign In
authRouter.post(
  '/signin',
  validateRequestSchema(schemas.SignInRequestBodySchema),
  (request: interfaces.SignInRequest, response: Response): void => {
    const cognitoUser = new CognitoUser({
      Username: request.body.username,
      Pool: userPool
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: request.body.username,
      Password: request.body.password
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
          access_token: session.getAccessToken().getJwtToken(),
          timestamp: Date.now()
        });
      },
      onFailure: (error: Error): void => {
        switch (error.name) {
          case 'NotAuthorizedException':
            response
              .status(401)
              .json({ message: 'Incorrect username or password.', timestamp: Date.now() });
            break;
          default:
            response.status(500).json({ message: 'Uh-oh. Server error.', timestamp: Date.now() });
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
  (request: interfaces.ForgotPasswordRequest, response: Response): void => {
    const cognitoUser = new CognitoUser({
      Username: request.body.username,
      Pool: userPool
    });

    cognitoUser.forgotPassword({
      onSuccess: (data: { CodeDeliveryDetails: CodeDeliveryDetails }): void => {
        response.status(200).json({
          message: `A verification code to reset your password has been sent your email: ${data.CodeDeliveryDetails.Destination}`,
          timestamp: Date.now()
        });
      },
      onFailure: (error: Error): void => {
        switch (error.name) {
          case 'LimitExceededException':
            response.status(500).json({ message: 'Uh-oh. Server error.', timestamp: Date.now() });
            break;
          default:
            response
              .status(400)
              .json({ message: 'Username provided does not exist.', timestamp: Date.now() });
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
  (request: interfaces.ConfirmNewPasswordRequest, response: Response): void => {
    const cognitoUser = new CognitoUser({
      Username: request.body.username,
      Pool: userPool
    });

    cognitoUser.confirmPassword(request.body.verification_code, request.body.new_password, {
      onSuccess: (): void => {
        response.status(200).json({
          message: 'Password updated.',
          timestamp: Date.now()
        });
      },
      onFailure: (error: Error): void => {
        switch (error.name) {
          case 'CodeMismatchException':
            response
              .status(401)
              .json({ message: 'Invalid verification code.', timestamp: Date.now() });
            break;
          case 'ExpiredCodeException':
            response
              .status(400)
              .json({ message: 'Verification code expired.', timestamp: Date.now() });
            break;
          default:
            response.status(500).json({ message: 'Uh-oh. Server error.', timestamp: Date.now() });
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
  (request: interfaces.RefreshTokenRequest, response: Response): void => {
    const session = new CognitoUserSession({
      IdToken: new CognitoIdToken({ IdToken: request.body.id_token }),
      AccessToken: new CognitoAccessToken({ AccessToken: request.body.access_token }),
      RefreshToken: new CognitoRefreshToken({ RefreshToken: request.cookies.refresh_token })
    });

    // TO DO: Implement proper token validation and refresh.
    if (session.isValid()) {
      response.status(200).json({ message: 'Tokens are valid.', timestamp: Date.now() });
    } else {
      response.status(401).json({ message: 'Tokens are invalid.', timestamp: Date.now() });
    }
  }
);

// Sign Out
authRouter.post(
  '/signout',
  validateRequestSchema(schemas.SignOutRequestBodySchema),
  (request: interfaces.SignOutRequest, response: Response): void => {
    const session = new CognitoUserSession({
      IdToken: new CognitoIdToken({ IdToken: request.body.id_token }),
      AccessToken: new CognitoAccessToken({ AccessToken: request.body.access_token }),
      RefreshToken: new CognitoRefreshToken({ RefreshToken: request.cookies.refresh_token })
    });

    // TO DO: Track the issue regarding `.signOut()` not revoking tokens.
    if (session.isValid()) {
      const idTokenDecodedType: types.IdTokenDecodedType = jwtDecode(request.body.id_token);
      const cognitoUser = new CognitoUser({
        Username: idTokenDecodedType['cognito:username'],
        Pool: userPool
      });
      cognitoUser.signOut();
      response.status(200).json({ message: 'Sign out successful.', timestamp: Date.now() });
    } else {
      response.status(401).json({ message: 'Tokens are invalid.', timestamp: Date.now() });
    }
  }
);
