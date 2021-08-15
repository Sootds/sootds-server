// EXTERNAL IMPORTS
import { Response } from 'express';
import {
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoAccessToken
} from 'amazon-cognito-identity-js';
import jwtDecode from 'jwt-decode';

// SHARED IMPORTS
import { UserPool } from '../../../shared/singletons';

// LOCAL IMPORTS
import { RefreshTokenRequest } from '../interfaces';
import { IdTokenDecodedType } from '../types';

export const signOutRequestHandler = (request: RefreshTokenRequest, response: Response): void => {
  const session = new CognitoUserSession({
    IdToken: new CognitoIdToken({ IdToken: request.body.id_token }),
    AccessToken: new CognitoAccessToken({ AccessToken: request.body.access_token }),
    RefreshToken: new CognitoRefreshToken({ RefreshToken: request.cookies.refresh_token })
  });

  // TO DO: Track the issue regarding `.signOut()` not revoking tokens.
  if (session.isValid()) {
    const idTokenDecoded: IdTokenDecodedType = jwtDecode(request.body.id_token);
    const cognitoUser = new CognitoUser({
      Username: idTokenDecoded['cognito:username'],
      Pool: UserPool
    });
    cognitoUser.signOut();
    response.status(200).json({ message: 'Sign out successful.', timestamp: Date.now() });
  } else {
    response.status(401).json({ message: 'Tokens are invalid.', timestamp: Date.now() });
  }
};
