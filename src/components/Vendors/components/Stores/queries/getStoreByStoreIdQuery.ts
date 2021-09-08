// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../../../shared/singletons';

// Types
type StoreType = {
  id: number;
  urlName: string;
};

export const getStoreByStoreIdQuery = async (storeId: number): Promise<StoreType> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT id, url_name FROM stores
    WHERE id = ($1)
    `,
    [storeId]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('No store found with provided store ID.');
  return { id: result.rows[0].id, urlName: result.rows[0].url_name };
};
