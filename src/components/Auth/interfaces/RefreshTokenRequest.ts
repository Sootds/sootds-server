// EXTERNAL IMPORTS
import { Request } from 'express';
import { ParamsDictionary, Query, CookieOptions } from 'express-serve-static-core';

interface RefreshTokenRequestParams extends ParamsDictionary {}

interface RefreshTokenRequestQuery extends Query {}

interface RefreshTokenRequestBody {
  id_token: string;
  access_token: string;
}

interface RefreshTokenRequestCookies extends CookieOptions {
  refresh_token: string;
}

export interface RefreshTokenRequest
  extends Request<
    RefreshTokenRequestParams,
    any,
    RefreshTokenRequestBody,
    RefreshTokenRequestQuery
  > {
  cookies: RefreshTokenRequestCookies;
}
