// EXTERNAL IMPORTS
import { Response } from 'express';

// SHARED IMPORTS
import { ResponseError } from '../../../shared/utils';

// LOCAL IMPORTS
import { GetUserInfoRequest } from '../interfaces';
import { getUserInfoQuery } from '../queries';

export const getUserInfoRequestHandler = async (
  request: GetUserInfoRequest,
  response: Response
): Promise<void> => {
  try {
    let user: any | null;
    try {
      user = await getUserInfoQuery(request.body.username);
    } catch (error: any) {
      throw new ResponseError(error.message, 400);
    }

    response.status(200).json({
      message: 'Successfully retrieved user info.',
      user,
      timestamp: Date.now()
    });
  } catch (error: any) {
    response.status(error.statusCode).json({
      message: error.message,
      timestamp: Date.now()
    });
  }
};
