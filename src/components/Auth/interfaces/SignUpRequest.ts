// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface SignUpRequestParams extends ParamsDictionary {}

interface SignUpRequestQuery extends Query {}

interface SignUpRequestBody {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface SignUpRequest
  extends Request<SignUpRequestParams, any, SignUpRequestBody, SignUpRequestQuery> {}
