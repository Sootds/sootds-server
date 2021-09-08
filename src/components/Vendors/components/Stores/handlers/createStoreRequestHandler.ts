// EXTERNAL IMPORTS
import { Response } from 'express';
import { CognitoIdentityServiceProvider, AWSError } from 'aws-sdk';

// SHARED IMPORTS
import * as sharedQueries from '../../../../../shared/queries';
import { ResponseError } from '../../../../../shared/utils';

// LOCAL IMPORTS
import { CreateStoreRequest } from '../interfaces';
import * as localQueries from '../queries';

export const createStoreRequestHandler = async (
  request: CreateStoreRequest,
  response: Response
): Promise<void> => {
  try {
    // Get user ID of `username`.
    let userId: number | null;
    try {
      userId = await sharedQueries.getUserIdQuery(request.body.username);
    } catch (error: any) {
      throw new ResponseError(error.message, 400);
    }

    // Update user's name info on AWS Cognito.
    const cisp = new CognitoIdentityServiceProvider();
    cisp.updateUserAttributes(
      {
        AccessToken: request.body.access_token,
        UserAttributes: [
          {
            Name: 'name',
            Value: request.body.personal_info.name
          }
        ]
      },
      (error: AWSError, _: CognitoIdentityServiceProvider.UpdateUserAttributesResponse): void => {
        if (error) throw new ResponseError(`Unable to update user's name.`, 500);
      }
    );

    // Update user's name on `users` table.
    try {
      await localQueries.setUserNameQuery(userId, request.body.personal_info.name);
    } catch {
      throw new ResponseError(`Unable to update user's name.`, 500);
    }

    // Check if user already has an address.
    try {
      await localQueries.getUserAddressIdQuery(userId);
    } catch {
      // If user has no address, create one and assign it to user.
      try {
        const addressId = await localQueries.createAddressQuery(request.body.personal_info);
        await localQueries.assignAddressToUserQuery(userId, addressId);
      } catch {
        throw new ResponseError(`Unable to assign address to user.`, 500);
      }
    }

    // Check if user already has a vendor account.
    let vendorId: number | null = null;
    try {
      // Get user's vendor ID.
      vendorId = await sharedQueries.getVendorIdQuery(userId);
    } catch {
      try {
        // If user does not have a vendor account, create one.
        vendorId = await localQueries.createVendorQuery(userId, request.body.personal_info);
      } catch {
        throw new ResponseError(`Unable to create vendor account.`, 500);
      }
    }

    // Check if vendor already has a store.
    try {
      // Get vendor's store's ID.
      await localQueries.getStoreIdByVendorIdQuery(vendorId);

      response.status(400).json({
        message: 'Vendor already has a store.',
        timestamp: Date.now()
      });
    } catch {
      // If vendor does not have a store, create one.
      const store = await localQueries.createStoreQuery(vendorId, request.body.store_info);

      // Assign vendor ID to the store ID in the `vendors__stores` mapping table.
      // Set the default role to `ADMIN`.
      await localQueries.mapVendorIdToStoreIdQuery(vendorId, store.id, 1);

      response.status(200).json({
        message: 'Successfully created vendor store.',
        url_name: store.urlName,
        timestamp: Date.now()
      });
    }
  } catch (error: any) {
    response.status(error.statusCode).json({
      message: error.message,
      timestamp: Date.now()
    });
  }
};
