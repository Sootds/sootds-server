// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORTS
import { DBPool } from '../singletons';

export const getVendorStoreRole = async (vendorId: number, storeId: number): Promise<string> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT
      vs.vendor_id,
      vs.store_id,
      vs.role_id,
      r.name as "role_name"
    FROM vendors__stores vs
    INNER JOIN roles r ON vs.role_id = r.id
    WHERE vs.vendor_id = ($1) AND vs.store_id = ($2)
    `,
    [vendorId, storeId]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('Vendor is not associated with store.');
  return result.rows[0].role_name;
};
