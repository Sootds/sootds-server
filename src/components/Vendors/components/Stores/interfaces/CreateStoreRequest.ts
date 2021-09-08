// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface CreateStoreRequestParams extends ParamsDictionary {}

interface CreateStoreRequestQuery extends Query {}

interface CreateStoreRequestBody {
  username: string;
  access_token: string;
  personal_info: {
    name: string;
    date_of_birth: {
      day: number;
      month: number;
      year: number;
    };
    address: string;
    city: string;
    country_id: number;
    state: string;
    code: string;
  };
  store_info: {
    name: string;
    decription: string;
  };
}

export interface CreateStoreRequest
  extends Request<CreateStoreRequestParams, any, CreateStoreRequestBody, CreateStoreRequestQuery> {}
