// EXTERNAL IMPORTS
import Joi from 'joi';

export const GetUserInfoRequestBodySchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).empty().required().messages({
    'string.alphanum': '`username` must be alpanumeric.',
    'string.min': '`username` length must be 3 or greater.',
    'string.max': '`username` length must be 30 or less.',
    'string.empty': '`username` cannot be empty.',
    'any.required': '`username` is required.'
  }),
  access_token: Joi.string().empty().required().messages({
    'string.empty': '`access_token` cannot be empty.',
    'any.required': '`access_token` is required.'
  }),
});