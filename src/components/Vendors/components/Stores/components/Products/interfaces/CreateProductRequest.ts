// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface CreateProductRequestParams extends ParamsDictionary {
  store_id: string;
}

interface CreateProductRequestQuery extends Query {}

interface CreateProductRequestBody {
  vendor_id: number;
  access_token: string;
  product: {
    name: string;
    description: string;
    tags: string[];
  }
}

export interface CreateProductRequest
  extends Request<
    CreateProductRequestParams,
    any,
    CreateProductRequestBody,
    CreateProductRequestQuery
  > {}
