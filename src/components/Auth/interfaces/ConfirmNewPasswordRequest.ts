// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

interface ConfirmNewPasswordRequestParams extends ParamsDictionary {}

interface ConfirmNewPasswordRequestQuery extends Query {}

interface ConfirmNewPasswordRequestBody {
  username: string;
  verification_code: string;
  new_password: string;
}

export interface ConfirmNewPasswordRequest
  extends Request<
    ConfirmNewPasswordRequestParams,
    any,
    ConfirmNewPasswordRequestBody,
    ConfirmNewPasswordRequestQuery
  > {}
