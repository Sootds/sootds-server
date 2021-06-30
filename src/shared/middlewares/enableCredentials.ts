// https://stackoverflow.com/questions/53898031/how-to-set-cookies-express-react-js

import { Request, Response, NextFunction } from 'express';

export const enableCredentials = (_: Request, response: Response, next: NextFunction): void => {
  response.header('Content-Type', 'application/json;charset=UTF-8')
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next();
}