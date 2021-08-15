// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons';
import { BEGIN, COMMIT, ROLLBACK } from '../../../shared/constants';

export const signInQuery = async (username: string): Promise<void> => {
  const dbClient = await DBPool.connect();
  let result: QueryResult | null = null;
  try {
    await dbClient.query(BEGIN);

    // Get `id` from `users` table.
    result = await dbClient.query(
      `
      SELECT id FROM users
      WHERE username = ($1)
      `,
      [username]
    );

    // Increment `count` in `sign_in_count` table.
    await dbClient.query(
      `
      UPDATE sign_in_counter
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ($1)
      `,
      [result.rows[0].id]
    );

    await dbClient.query(COMMIT);
  } catch (error: any) {
    await dbClient.query(ROLLBACK);
    throw error;
  } finally {
    dbClient.release();
  }
};
