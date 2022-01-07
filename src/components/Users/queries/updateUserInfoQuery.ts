// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons';
import { BEGIN, COMMIT, ROLLBACK } from '../../../shared/constants';

// Types
type User = {
  name: string;
  birthdate: string;
  address: {
    name: string;
    city: string;
    state: string;
    code: string;
    country_id: number;
  };
};

export const updateUserInfoQuery = async (username: string, updatedUserInfo: User): Promise<void> => {
  const dbClient = await DBPool.connect();
  try {
    dbClient.query(BEGIN)
    await dbClient.query(
      `
      UPDATE users
      SET name = ($1), birthdate = ($2)
      WHERE username = ($3)
      `,
      [updatedUserInfo.name, updatedUserInfo.birthdate, username]
    );
    await dbClient.query(
      `
      UPDATE addresses a
      SET
        name = ($1),
        city = ($2),
        state = ($3),
        code = ($4),
        country_id = ($5)
      FROM users u
      WHERE a.id = u.address_id
      AND u.username = ($6)
      `,
      [
        updatedUserInfo.address.name,
        updatedUserInfo.address.city,
        updatedUserInfo.address.state,
        updatedUserInfo.address.code,
        updatedUserInfo.address.country_id,
        username
      ]
    );
    dbClient.query(COMMIT);
  } catch (error) {
    await dbClient.query(ROLLBACK);
    throw new Error(error.message);
  } finally {
    dbClient.release();
  }
};
