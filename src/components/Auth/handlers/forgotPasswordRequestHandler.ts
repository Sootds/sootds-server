// EXTERNAL IMPORTS
import { Response } from 'express';
import { CognitoUser, CodeDeliveryDetails } from 'amazon-cognito-identity-js';

// SHARED IMPORTS
import { UserPool } from '../../../shared/singletons';

// LOCAL IMPORTS
import { ForgotPasswordRequest } from '../interfaces';

export const forgotPasswordRequestHandler = (
  request: ForgotPasswordRequest,
  response: Response
): void => {
  const cognitoUser = new CognitoUser({
    Username: request.body.username,
    Pool: UserPool
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
};
