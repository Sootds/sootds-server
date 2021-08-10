// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface VerifyAccountRequestParams extends ParamsDictionary {}

interface VerifyAccountRequestQuery extends Query {}

interface VerifyAccountRequestBody {
  username: string;
  verification_code: string;
}

export interface VerifyAccountRequest
  extends Request<
    VerifyAccountRequestParams,
    any,
    VerifyAccountRequestBody,
    VerifyAccountRequestQuery
  > {}
