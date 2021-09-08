// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../../../shared/singletons';

export const getUserAddressIdQuery = async (userId: number): Promise<number> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT address_id FROM users
    WHERE id = ($1)
    `,
    [userId]
  );
  dbClient.release();

  if (result.rows[0].address_id === null) throw new Error('User does not have an address.');
  return result.rows[0].address_id;
};
