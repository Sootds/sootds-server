// EXTERNAL IMPORTS
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

// SHARED IMPORTS
import { getJwk } from '../utils';

export const verifyAccessToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  // 1. Parse `access_token`.
  const headers = request.body.access_token.split('.');
  const buff = Buffer.from(headers[0], 'base64');
  const text = buff.toString('ascii');
  const header = JSON.parse(text);

  // 2. Get the matching JSON web key.
  let matchingJwk = null;
  const jwks = await getJwk();
  for (const jwk of jwks.keys) if (jwk.kid == header.kid) matchingJwk = jwk;

  // 3. Verify JSON web key.
  const pem = jwkToPem(matchingJwk);
  jwt.verify(request.body.access_token, pem, { algorithms: ['RS256'] }, (error: Error, _: any) => {
    if (error) {
      response.status(401).json({ message: 'Invalid access token.', timestamp: Date.now() });
    } else {
      next();
    }
  });
};
