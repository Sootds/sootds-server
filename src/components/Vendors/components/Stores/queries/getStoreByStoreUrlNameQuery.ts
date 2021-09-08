// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../../../shared/singletons';

// Types
type StoreType = {
  id: number;
  urlName: string;
};

export const getStoreByStoreUrlNameQuery = async (urlName: string): Promise<StoreType> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT id, url_name FROM stores
    WHERE url_name = ($1)
    `,
    [urlName]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('No store found with provided store URL name.');
  return { id: result.rows[0].id, urlName: result.rows[0].url_name };
};
