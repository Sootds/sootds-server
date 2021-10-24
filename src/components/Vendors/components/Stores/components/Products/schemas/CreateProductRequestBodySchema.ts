// EXTERNAL IMPORTS
import Joi from 'joi';

export const CreateStoreRequestBodySchema = Joi.object().keys({
  vendor_id: Joi.number().integer().required().messages({
    'number.base': '`vendor_id` must be a number.',
    'number.integer': '`vendor_id` must be an integer.',
    'any.required': '`vendor_id` is required.'
  }),
  access_token: Joi.string().empty().required().messages({
    'string.empty': '`access_token` cannot be empty.',
    'any.required': '`access_token` is required.'
  }),
  product: Joi.object().keys({
    name: Joi.string().min(3).max(60).empty().required().messages({
      'string.min': '`name` length must be 3 or greater.',
      'string.max': '`name` length must be 60 or less.',
      'string.empty': '`name` cannot be empty.',
      'any.required': '`name` is required.'
    }),
    description: Joi.string().allow('').required().messages({
      'any.required': '`description` is required.'
    }),
    tags: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': '`tag` must be a string.'
        })
      )
      .required()
      .messages({
        'any.required': '`tags` is required.',
        'array.': 'lol'
      })
  })
});
