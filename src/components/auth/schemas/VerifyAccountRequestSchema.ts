import Joi from 'joi';

export const VerifyAccountRequestSchema = Joi.object().keys({
  user_name: Joi.string().alphanum().min(3).max(30).empty().required().messages({
    'string.alphanum': "`user_name` must be alpanumeric.",
    'string.min': "`user_name` length must be 3 or greater.",
    'string.max': "`user_name` length must be 30 or less.",
    'string.empty': '`user_name` cannot be empty.',
    'any.required': "`user_name` is required."
  }),
  confirmation_code: Joi.string().empty().required().messages({
    'string.empty': '`confirmation_code` cannot be empty.',
    'any.required': "`confirmation_code` is required."
  })
});
