// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { BEGIN, COMMIT, ROLLBACK } from '../../../../../shared/constants';
import { DBPool } from '../../../../../shared/singletons';

export const mapVendorIdToStoreIdQuery = async (
  vendorId: number,
  storeId: number,
  roleId: number
): Promise<void> => {
  const dbClient = await DBPool.connect();
  try {
    dbClient.query(BEGIN);
    await dbClient.query(
      `
      INSERT INTO vendors__stores (vendor_id, store_id, role_id)
      VALUES ($1, $2, $3)
      `,
      [vendorId, storeId, roleId]
    );
    dbClient.query(COMMIT);
  } catch {
    await dbClient.query(ROLLBACK);
    throw new Error('Database query failed.');
  } finally {
    dbClient.release();
  }
};
