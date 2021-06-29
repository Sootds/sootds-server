import Joi from 'joi';

export const SignUpRequestSchema = Joi.object().keys({
  user_name: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': `"user_name" must be alpanumeric.`,
    'string.min': `"user_name" length must be 3 or greater.`,
    'string.max': `"user_name" length must be 30 or less.`,
    'any.required': `"user_name" is required.`
  }),
  first_name: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': `"first_name" must be alpanumeric.`,
    'string.min': `"first_name" length must be 3 or greater.`,
    'string.max': `"first_name" length must be 30 or less.`,
    'any.required': `"first_name" is required.`
  }),
  last_name: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': `"last_name" must be alpanumeric.`,
    'string.min': `"last_name" length must be 3 or greater.`,
    'string.max': `"last_name" length must be 30 or less.`,
    'any.required': `"last_name" is required.`
  }),
  email: Joi.string().email().required().messages({
    'string.email': `"email" must be a valid email.`,
    'any.required': `"email" is required.`
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/
      )
    )
    .messages({
      'string.pattern.base': `"password" length must be 8 or greater and must contain a number, a special character, an uppercase and lowercase letter.`
    })
});
