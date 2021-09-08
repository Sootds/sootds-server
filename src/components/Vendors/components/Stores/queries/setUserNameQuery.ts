// SHARED IMPORTS
import { BEGIN, COMMIT, ROLLBACK } from '../../../../../shared/constants';
import { DBPool } from '../../../../../shared/singletons';

export const setUserNameQuery = async (userId: number, name: string): Promise<void> => {
  const dbClient = await DBPool.connect();
  try {
    dbClient.query(BEGIN);
    await dbClient.query(
      `
      UPDATE users
      SET name = ($1)
      WHERE id = ($2)
      `,
      [name, userId]
    );
    dbClient.query(COMMIT);
  } catch {
    await dbClient.query(ROLLBACK);
    throw new Error('Database query failed.');
  } finally {
    dbClient.release();
  }
};
