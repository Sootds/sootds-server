// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface ProductsRequestParams extends ParamsDictionary {
  store_id: string;
  product_id?: string;
}

export interface ProductsRequest extends Request<ProductsRequestParams> {}
