// EXTERNAL IMPORTS
import { Response } from 'express';
import { CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';

// SHARED IMPORTS
import { UserPool } from '../../../shared/singletons';

// LOCAL IMPORTS
import { SignUpRequest } from '../interfaces';
import { signUpQuery } from '../queries';

export const signUpRequestHandler = (request: SignUpRequest, response: Response): void => {
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

  UserPool.signUp(
    request.body.username,
    request.body.password,
    attributeList,
    null,
    async (error: Error, _: ISignUpResult): Promise<void> => {
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
        try {
          await signUpQuery(request.body.username, request.body.email, request.body.name);
          response.status(200).json({ message: 'Account created.', timestamp: Date.now() });
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
