// EXTERNAL IMPORTS
import { Response } from 'express';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';

// SHARED IMPORTS
import { UserPool } from '../../../shared/singletons';

// LOCAL IMPORTS
import { VerifyAccountRequest } from '../interfaces';
import { verifyAccountQuery } from '../queries';

export const verifyAccountRequestHandler = (
  request: VerifyAccountRequest,
  response: Response
): void => {
  const cognitoUser = new CognitoUser({
    Username: request.body.username,
    Pool: UserPool
  });

  cognitoUser.confirmRegistration(
    request.body.verification_code,
    true,
    async (error: Error, _: ISignUpResult): Promise<void> => {
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
        try {
          await verifyAccountQuery(request.body.username);
          response.status(200).json({ message: 'Account verified.', timestamp: Date.now() });
        } catch (error: any) {
          response.status(500).json({
            message: 'Something happened with the database.',
            timestamp: Date.now()
          });
        }
      }
    }
  );
};
