// EXTERNAL IMPORTS
import { Response } from 'express';

// SHARED IMPORTS
import { ResponseError } from '../../../../../shared/utils';

// LOCAL IMPORTS
import * as localQueries from '../queries';
import { GetStoreRequest } from '../interfaces';
import { StoreType } from '../types';

export const getStoreRequestHandler = async (
  request: GetStoreRequest,
  response: Response
): Promise<void> => {
  const id = request.query.id;
  const urlName = request.query.url_name;
  let store: StoreType | null = null;

  try {
    if (id !== undefined) store = await localQueries.getStoreByStoreIdQuery(parseInt(id, 10));
    else if (urlName !== undefined) store = await localQueries.getStoreByStoreUrlNameQuery(urlName);
    else throw new ResponseError('Invalid query.', 400);
  } catch (error: any) {
    response.status(400).json({
      message: error.message,
      timestamp: Date.now()
    });
  }

  response.status(200).json({
    message: `Successfully retrieved store.`,
    store: { id: store.id, url_name: store.urlName, name: store.name },
    timestamp: Date.now()
  });
};
