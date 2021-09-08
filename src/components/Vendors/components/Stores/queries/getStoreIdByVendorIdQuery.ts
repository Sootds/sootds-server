// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../../../shared/singletons';

export const getStoreIdByVendorIdQuery = async (vendorId: number): Promise<number> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT id FROM stores
    WHERE created_by = ($1)
    `,
    [vendorId]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('No store found with provided vendor ID.');
  return result.rows[0].id;
};
