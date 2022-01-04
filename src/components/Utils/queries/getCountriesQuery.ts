// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../../../shared/singletons'

export const getCountriesQuery = async (): Promise<any> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT id, name FROM countries
    `
  );
  dbClient.release();

  if (result.rowCount < 1) throw new Error('No countries found.');
  return result.rows;
};