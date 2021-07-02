// EXTERNAL IMPORTS
import Joi from 'joi';

export const SignUpRequestSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).empty().required().messages({
    'string.alphanum': '`username` must be alpanumeric.',
    'string.min': '`username` length must be 3 or greater.',
    'string.max': '`username` length must be 30 or less.',
    'string.empty': '`username` cannot be empty.',
    'any.required': '`username` is required.'
  }),
  name: Joi.string().min(3).max(60).empty().required().messages({
    'string.min': '`name` length must be 3 or greater.',
    'string.max': '`name` length must be 60 or less.',
    'string.empty': '`name` cannot be empty.',
    'any.required': '`name` is required.'
  }),
  email: Joi.string().email().empty().required().messages({
    'string.email': '`email` must be a valid email.',
    'string.empty': '`email` cannot be empty.',
    'any.required': '`email` is required.'
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/
      )
    )
    .empty()
    .required()
    .messages({
      'string.pattern.base':
        '`password` length must be 8 or greater and must contain a number, a special character, an uppercase and lowercase letter.',
      'string.empty': '`password` cannot be empty.',
      'any.required': '`password` is required.'
    })
});
