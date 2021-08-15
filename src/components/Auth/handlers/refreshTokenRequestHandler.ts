// EXTERNAL IMPORTS
import { Response } from 'express';
import {
  CognitoUserSession,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoAccessToken
} from 'amazon-cognito-identity-js';

// LOCAL IMPORTS
import { RefreshTokenRequest } from '../interfaces';

export const refreshTokenRequestHandler = (
  request: RefreshTokenRequest,
  response: Response
): void => {
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
};
