// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons';
import { BEGIN, COMMIT, ROLLBACK } from '../../../shared/constants';

export const verifyAccountQuery = async (username: string): Promise<void> => {
  const dbClient = await DBPool.connect();
  try {
    await dbClient.query(BEGIN);

    // Update user `verified` cell to `TRUE`.
    await dbClient.query(
      `
      UPDATE users
      SET verified = TRUE,
      updated_at = CURRENT_TIMESTAMP
      WHERE username = ($1)
      `,
      [username]
    );

    await dbClient.query(COMMIT);
  } catch (error: any) {
    await dbClient.query(ROLLBACK);
    throw error;
  } finally {
    dbClient.release();
  }
};
