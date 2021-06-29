import Joi from 'joi';

export const SignInRequestSchema = Joi.object().keys({
  user_name: Joi.string().required().messages({
    'any.required': '`user_name` is required.'
  }),
  password: Joi.string().required().messages({
    'any.required': '`password` is required.'
  })
});
