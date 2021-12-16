// EXTERNAL IMPORTS
import Joi from 'joi';

export const UpdateUserInfoRequestBodySchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).empty().required().messages({
    'string.alphanum': '`username` must be alpanumeric.',
    'string.min': '`username` length must be 3 or greater.',
    'string.max': '`username` length must be 30 or less.',
    'string.empty': '`username` cannot be empty.',
    'any.required': '`username` is required.'
  }),
  user: Joi.object()
    .keys({
      name: Joi.string().min(3).max(60).empty().required().messages({
        'string.min': '`name` length must be 3 or greater.',
        'string.max': '`name` length must be 60 or less.',
        'string.empty': '`name` cannot be empty.',
        'any.required': '`name` is required.'
      }),
      birthdate: Joi.date().iso().messages({
        'date.format': 'Date format must be \'YYYY-MM-DD\'.'
      }),
      address: Joi.object().keys({
        name: Joi.string().empty().required().messages({
          'any.required': '`address.name` is required.',
          'string.empty': '`address.name` cannot be empty.'
        }),
        city: Joi.string().empty().required().messages({
          'any.required': '`address.city` is required.',
          'string.empty': '`address.city` cannot be empty.'
        }),
        state: Joi.string().empty().required().messages({
          'any.required': '`address.state` is required.',
          'string.empty': '`address.state` cannot be empty.'
        }),
        code: Joi.string().empty().required().messages({
          'any.required': '`address.code` is required.',
          'string.empty': '`address.code` cannot be empty.'
        }),
        country_id: Joi.number().min(1).required().messages({
          'any.required': '`address.country_id` is required.',
          'number.min': '`address.country_id` cannot be less than 1.'
        }),
      })
    })
    .required()
    .messages({
      'any.required': '`user` is required.'
    }),
  access_token: Joi.string().empty().required().messages({
    'string.empty': '`access_token` cannot be empty.',
    'any.required': '`access_token` is required.'
  })
});
