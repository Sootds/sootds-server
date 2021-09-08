// EXTERNAL IMPORTS
import fetch from 'node-fetch';

const region = process.env.AWS_COGNITO_REGION;
const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID;
let jwk = null;

export const getJwk = async (): Promise<any> => {
  if (!jwk) {
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) jwk = await response.json();
  }
  return jwk;
};
