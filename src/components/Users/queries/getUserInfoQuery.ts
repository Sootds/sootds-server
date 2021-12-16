// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons';

export const getUserInfoQuery = async (username: string): Promise<void> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT
      u.id,
      u.username,
      u.email,
      u.name,
      u.birthdate,
      json_build_object(
        'name', a.name,
        'city', a.city,
        'state', a.state,
        'code', a.code,
        'country_id', c.id
      ) AS address,
      u.verified
    FROM users u
    INNER JOIN addresses a ON u.address_id = a.id
    INNER JOIN countries c ON a.country_id = c.id
    WHERE u.username = ($1)
    AND u.deleted = false
    `,
    [username]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('No user found with provided username.');
  return result.rows[0];
};
