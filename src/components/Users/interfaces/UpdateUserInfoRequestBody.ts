// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface UpdateUserInfoRequestParams extends ParamsDictionary {}

interface UpdateUserInfoRequestQuery extends Query {}

interface UpdateUserInfoRequestBody {
  username: string;
  updated_user_info: {
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
  access_token: string;
}

export interface UpdateUserInfoRequest
  extends Request<
    UpdateUserInfoRequestParams,
    any,
    UpdateUserInfoRequestBody,
    UpdateUserInfoRequestQuery
  > {}
