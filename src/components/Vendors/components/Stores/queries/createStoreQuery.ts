// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { BEGIN, COMMIT, ROLLBACK } from '../../../../../shared/constants';
import { DBPool } from '../../../../../shared/singletons';
import { urlify } from '../../../../../shared/utils';

export const createStoreQuery = async (
  vendorId: number,
  storeInfo: any
): Promise<{ id: number; urlName: string }> => {
  const dbClient = await DBPool.connect();
  let id: number | null = null;
  let urlName: string | null = null;

  try {
    dbClient.query(BEGIN);
    const result: QueryResult = await dbClient.query(
      `
      INSERT INTO stores (created_by, name, description, url_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, url_name
      `,
      [vendorId, storeInfo.name, storeInfo.description, urlify(storeInfo.name)]
    );
    id = result.rows[0].id;
    urlName = result.rows[0].url_name;
    dbClient.query(COMMIT);
  } catch {
    await dbClient.query(ROLLBACK);
    throw new Error('Database query failed.');
  } finally {
    dbClient.release();
  }

  return { id, urlName };
};
