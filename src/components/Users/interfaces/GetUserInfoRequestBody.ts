// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface GetUserInfoRequestParams extends ParamsDictionary {}

interface GetUserInfoRequestQuery extends Query {}

interface GetUserInfoRequestBody {
  username: string;
  access_token: string;
}

export interface GetUserInfoRequest
  extends Request<GetUserInfoRequestParams, any, GetUserInfoRequestBody, GetUserInfoRequestQuery> {}
