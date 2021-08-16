// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons';
import { BEGIN, COMMIT, ROLLBACK } from '../../../shared/constants';

export const signInQuery = async (username: string): Promise<boolean> => {
  const dbClient = await DBPool.connect();
  let signInCount = 0;
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
    const userId = result.rows[0].id;

    // Check if this is user's first sign in.
    result = await dbClient.query(
      `
      SELECT count FROM sign_in_counter
      WHERE user_id = ($1)
      `,
      [userId]
    );
    signInCount = result.rows[0].count;

    // Increment `count` in `sign_in_count` table.
    await dbClient.query(
      `
      UPDATE sign_in_counter
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ($1)
      `,
      [userId]
    );

    await dbClient.query(COMMIT);
  } catch (error: any) {
    await dbClient.query(ROLLBACK);
    throw error;
  } finally {
    dbClient.release();
  }

  return signInCount === 0;
};
