// EXTERNAL IMPORTS
import { Request, Response } from 'express';

// SHARED IMPORTS
import { ResponseError } from '../../../shared/utils'

// LOCAL IMPORTS
import { getCountriesQuery } from '../queries';

export const getCountriesRequestHandler = async (_: Request, response: Response): Promise<void> => {
  try {
    let countries: any | null;
    try {
      countries = await getCountriesQuery();
    } catch (error: any) {
      throw new ResponseError(error.message, 400);
    }

    response.status(200).json({
      message: 'Successfully retrieved countries.',
      countries,
      timestamp: Date.now()
    });
  } catch (error: any) {
    response.status(error.statusCode).json({
      message: error.message,
      timestamp: Date.now()
    });
  }
};