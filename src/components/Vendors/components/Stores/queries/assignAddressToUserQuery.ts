// SHARED IMPORTS
import { BEGIN, COMMIT, ROLLBACK } from '../../../../../shared/constants';
import { DBPool } from '../../../../../shared/singletons';

export const assignAddressToUserQuery = async (
  userId: number,
  addressId: number
): Promise<void> => {
  const dbClient = await DBPool.connect();
  try {
    dbClient.query(BEGIN);
    await dbClient.query(
      `
      UPDATE users
      SET address_id = ($1)
      WHERE id = ($2)
      `,
      [addressId, userId]
    );
    dbClient.query(COMMIT);
  } catch {
    await dbClient.query(ROLLBACK);
    throw new Error('Database query failed.');
  } finally {
    dbClient.release();
  }
};
