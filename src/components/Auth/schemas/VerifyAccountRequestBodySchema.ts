// EXTERNAL IMPORTS
import Joi from 'joi';

export const VerifyAccountRequestBodySchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).empty().required().messages({
    'string.alphanum': '`username` must be alpanumeric.',
    'string.min': '`username` length must be 3 or greater.',
    'string.max': '`username` length must be 30 or less.',
    'string.empty': '`username` cannot be empty.',
    'any.required': '`username` is required.'
  }),
  verification_code: Joi.string().empty().required().messages({
    'string.empty': '`verification_code` cannot be empty.',
    'any.required': "`verification_code` is required."
  })
});
