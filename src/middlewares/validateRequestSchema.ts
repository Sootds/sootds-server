import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequestSchema =
  (schema: Schema) => (request: Request, response: Response, next: NextFunction) => {
    const validate = schema.validate(request.body);
    if (validate.error == null) {
      next();
    } else {
      const message = validate.error.details.map((detail) => detail.message).join(',');
      response.status(400).json({ error: message });
    }
  };
