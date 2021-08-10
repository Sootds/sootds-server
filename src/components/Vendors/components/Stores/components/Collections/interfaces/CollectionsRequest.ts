// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface CollectionsRequestParams extends ParamsDictionary {
  store_id: string;
  collection_id?: string;
}

export interface CollectionsRequest extends Request<CollectionsRequestParams> {}
