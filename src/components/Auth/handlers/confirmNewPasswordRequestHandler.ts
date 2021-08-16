// EXTERNAL IMPORTS
import { Response } from 'express';
import { CognitoUser } from 'amazon-cognito-identity-js';

// SHARED IMPORTS
import { UserPool } from '../../../shared/singletons';

// LOCAL IMPORTS
import { ConfirmNewPasswordRequest } from '../interfaces';

export const confirmNewPasswordHandler = (
  request: ConfirmNewPasswordRequest,
  response: Response
): void => {
  const cognitoUser = new CognitoUser({
    Username: request.body.username,
    Pool: UserPool
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
};
