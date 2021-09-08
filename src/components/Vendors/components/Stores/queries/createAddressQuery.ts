// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { BEGIN, COMMIT, ROLLBACK } from '../../../../../shared/constants';
import { DBPool } from '../../../../../shared/singletons';

export const createAddressQuery = async (personalInfo: any): Promise<number> => {
  const dbClient = await DBPool.connect();
  let addressId: number | null = null;

  try {
    dbClient.query(BEGIN);
    const result: QueryResult = await dbClient.query(
      `
      INSERT INTO addresses (name, country_id, city, state, code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `,
      [
        personalInfo.address,
        personalInfo.country_id,
        personalInfo.city,
        personalInfo.state,
        personalInfo.code
      ]
    );
    addressId = result.rows[0].id;
    dbClient.query(COMMIT);
  } catch (error: any) {
    await dbClient.query(ROLLBACK);
    throw new Error('Database query failed.');
  } finally {
    dbClient.release();
  }

  return addressId;
};
