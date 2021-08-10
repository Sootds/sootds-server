// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface CollectionsRequestParams extends ParamsDictionary {
  collection_id?: string;
}

export interface CollectionsRequest extends Request<CollectionsRequestParams> {}
