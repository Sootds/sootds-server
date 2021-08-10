// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface SignInRequestParams extends ParamsDictionary {}

interface SignInRequestQuery extends Query {}

interface SignInRequestBody {
  username: string;
  password: string;
}

export interface SignInRequest
  extends Request<
    SignInRequestParams,
    any,
    SignInRequestBody,
    SignInRequestQuery
  > {}
