import Joi from 'joi';

export const ConfirmAccountRequestSchema = Joi.object().keys({
  user_name: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': `"user_name" must be alpanumeric.`,
    'string.min': `"user_name" length must be 3 or greater.`,
    'string.max': `"user_name" length must be 30 or less.`,
    'any.required': `"user_name" is required.`
  }),
  confirmation_code: Joi.string().required().messages({
    'any.required': `"confirmation_code" is required.`
  })
});
