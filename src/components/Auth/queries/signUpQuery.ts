// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons';
import { BEGIN, COMMIT, ROLLBACK } from '../../../shared/constants';

export const signUpQuery = async (
  username: string,
  email: string,
  name: string
): Promise<void> => {
  const dbClient = await DBPool.connect();
  let result: QueryResult | null = null;
  try {
    await dbClient.query(BEGIN);

    // Insert new user to `users` table.
    result = await dbClient.query(
      `
      INSERT INTO users(username, email, name)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [username, email, name]
    );

    // Insert entry to `sign_in_counter` table.
    await dbClient.query(
      `
      INSERT INTO sign_in_counter(user_id) 
      VALUES ($1)
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
