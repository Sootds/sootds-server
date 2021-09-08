// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface GetStoreRequestParams extends ParamsDictionary {}

interface GetStoreRequestQuery extends Query {
  id?: string;
  url_name?: string;
}

interface GetStoreRequestBody {}

export interface GetStoreRequest
  extends Request<GetStoreRequestParams, any, GetStoreRequestBody, GetStoreRequestQuery> {}
