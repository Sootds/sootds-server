// EXTERNAL IMPORTS
import { Response } from 'express';

// SHARED IMPORTS
import { ResponseError } from '../../../shared/utils';

// LOCAL IMPORTS
import { UpdateUserInfoRequest } from '../interfaces';
import { updateUserInfoQuery } from '../queries';

export const updateUserInfoRequestHandler = async (
  request: UpdateUserInfoRequest,
  response: Response
): Promise<void> => {
  try {
    try {
      await updateUserInfoQuery(request.body.username, request.body.user);
    } catch (error: any) {
      throw new ResponseError(error.message, 400);
    }

    response.status(200).json({
      message: 'Successfully updated user info.',
      timestamp: Date.now()
    });
  } catch (error: any) {
    response.status(error.statusCode).json({
      message: error.message,
      timestamp: Date.now()
    });
  }
};
