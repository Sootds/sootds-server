// EXTERNAL IMPORTS
import { Response } from 'express';
import { CognitoUser, CognitoUserSession, AuthenticationDetails } from 'amazon-cognito-identity-js';

// SHARED IMPORTS
import { UserPool } from '../../../shared/singletons';

// LOCAL IMPORTS
import { SignInRequest } from '../interfaces';
import { signInQuery } from '../queries';

export const signInRequestHandler = (request: SignInRequest, response: Response): void => {
  const cognitoUser = new CognitoUser({
    Username: request.body.username,
    Pool: UserPool
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: request.body.username,
    Password: request.body.password
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: async (session: CognitoUserSession): Promise<void> => {
      try {
        await signInQuery(request.body.username);
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
      } catch (error: any) {
        response.status(500).json({
          message: 'Something happened with the database.',
          timestamp: Date.now()
        });
      }
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
};
