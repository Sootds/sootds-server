// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { BEGIN, COMMIT, ROLLBACK } from '../../../../../shared/constants';
import { DBPool } from '../../../../../shared/singletons';

export const createVendorQuery = async (userId: number, personalInfo: any): Promise<number> => {
  const dbClient = await DBPool.connect();
  let vendorId: number | null = null;

  try {
    dbClient.query(BEGIN);
    const result: QueryResult = await dbClient.query(
      `
      INSERT INTO vendors (user_id, name)
      VALUES ($1, $2)
      RETURNING id
      `,
      [userId, personalInfo.name]
    );
    vendorId = result.rows[0].id;
    dbClient.query(COMMIT);
  } catch {
    await dbClient.query(ROLLBACK);
    throw new Error('Database query failed.');
  } finally {
    dbClient.release();
  }

  return vendorId;
};
