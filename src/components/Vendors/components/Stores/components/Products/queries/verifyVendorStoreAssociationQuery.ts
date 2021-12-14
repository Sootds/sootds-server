// EXTERNAL IMPORTS
import { QueryResult } from 'pg';

// SHARED IMPORT
import { DBPool } from '../../../../../../../shared/singletons';

export const verifyVendorStoreAssociationQuery = async (
  vendorId: number,
  storeId: number
): Promise<boolean> => {
  const dbClient = await DBPool.connect();
  const result: QueryResult = await dbClient.query(
    `
    SELECT * FROM vendors__stores
    WHERE vendor_id = ($1) AND store_id = ($2)
    `,
    [vendorId, storeId]
  );
  dbClient.release();

  if (result.rowCount != 1) throw new Error('Vendor is not associated with store.');
  return true;
};
