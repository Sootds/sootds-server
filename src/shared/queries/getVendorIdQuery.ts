// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../singletons';

export const getVendorIdQuery = async (userId: number): Promise<number> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT id FROM vendors
    WHERE user_id = ($1)
    `,
    [userId]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('No vendor found with provided user ID.');
  return result.rows[0].id;
};
