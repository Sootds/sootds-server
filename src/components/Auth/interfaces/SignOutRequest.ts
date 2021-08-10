// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query, CookieOptions } from 'express-serve-static-core';

interface SignOutRequestParams extends ParamsDictionary {}

interface SignOutRequestQuery extends Query {}

interface SignOutRequestBody {
  id_token: string;
  access_token: string;
}

interface SignOutRequestCookies extends CookieOptions {
  refresh_token: string;
}

export interface SignOutRequest
  extends Request<
    SignOutRequestParams,
    any,
    SignOutRequestBody,
    SignOutRequestQuery
  > {
    cookies: SignOutRequestCookies
  }
