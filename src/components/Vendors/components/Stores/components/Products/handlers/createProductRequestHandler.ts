// EXTERNAL IMPORTS
import { Response } from 'express';

// SHARED IMPORTS
import { DBPool } from '../../../../../../../shared/singletons';
import { ResponseError } from '../../../../../../../shared/utils';
import { getVendorStoreRole } from '../../../../../../../shared/queries';

// LOCAL IMPORTS
import * as localQueries from '../queries';
import { CreateProductRequest } from '../interfaces';

export const createProductRequestHandler = async (
  request: CreateProductRequest,
  response: Response
): Promise<void> => {
  try {
    // Check if vendor is associated to store.
    try {
      await localQueries.verifyVendorStoreAssociationQuery(
        request.body.vendor_id,
        parseInt(request.params.store_id, 10)
      );
    } catch (error: any) {
      throw new ResponseError(error.message, 400);
    }

    // Check if vendor's role is allowed to create a product.
    try {
      const role = await getVendorStoreRole(
        request.body.vendor_id,
        parseInt(request.params.store_id, 10)
      );
      switch (role) {
        case 'ADMIN':
          break;
        default:
          throw new ResponseError(`Vendor does not have permission to create product.`, 401);
      }
    } catch (error: any) {
      throw new ResponseError(error.message, error.statusCode);
    }

    // Create product.
  } catch (error: any) {
    response.status(error.statusCode).json({
      message: error.message,
      timestamp: Date.now()
    });
  }
};
