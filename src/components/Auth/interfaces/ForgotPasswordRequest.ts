// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface ForgotPasswordRequestParams extends ParamsDictionary {}

interface ForgotPasswordRequestQuery extends Query {}

interface ForgotPasswordRequestBody {
  username: string;
}

export interface ForgotPasswordRequest
  extends Request<
    ForgotPasswordRequestParams,
    any,
    ForgotPasswordRequestBody,
    ForgotPasswordRequestQuery
  > {}
