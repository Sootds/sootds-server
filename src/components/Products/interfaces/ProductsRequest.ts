// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface ProductsRequestParams extends ParamsDictionary {
  product_id?: string;
}

export interface ProductsRequest extends Request<ProductsRequestParams> {}
