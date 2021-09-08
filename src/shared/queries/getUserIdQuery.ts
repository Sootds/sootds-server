// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../singletons';

export const getUserIdQuery = async (username: string): Promise<number> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT id FROM users
    WHERE username = ($1)
    `,
    [username]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('No user found with provided username.');
  return result.rows[0].id;
};
