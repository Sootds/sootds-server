// EXTERNAL IMPORTS
import Joi from 'joi';

export const ConfirmNewPasswordRequestBodySchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).empty().required().messages({
    'string.alphanum': '`username` must be alpanumeric.',
    'string.min': '`username` length must be 3 or greater.',
    'string.max': '`username` length must be 30 or less.',
    'string.empty': '`username` cannot be empty.',
    'any.required': '`username` is required.'
  }),
  verification_code: Joi.string().empty().required().messages({
    'string.empty': '`verification_code` cannot be empty.',
    'any.required': '`verification_code` is required.'
  }),
  new_password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/
      )
    )
    .empty()
    .required()
    .messages({
      'string.pattern.base':
        '`new_password` length must be 8 or greater and must contain a number, a special character, an uppercase and lowercase letter.',
      'string.empty': '`new_password` cannot be empty.',
      'any.required': '`new_password` is required.'
    })
});
