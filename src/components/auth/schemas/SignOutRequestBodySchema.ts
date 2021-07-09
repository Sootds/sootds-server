// EXTERNAL IMPORTS
import Joi from 'joi';

export const SignOutRequestBodySchema = Joi.object().keys({
  id_token: Joi.string().empty().required().messages({
    'string.empty': '`id_token` cannot be empty.',
    'any.required': '`id_token` is required.'
  }),
  access_token: Joi.string().empty().required().messages({
    'string.empty': '`access_token` cannot be empty.',
    'any.required': '`access_token` is required.'
  })
});
