// EXTERNAL IMPORTS
import Joi from 'joi';

export const CreateStoreRequestBodySchema = Joi.object().keys({
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
  personal_info: Joi.object()
    .keys({
      name: Joi.string().min(3).max(60).empty().required().messages({
        'string.min': '`name` length must be 3 or greater.',
        'string.max': '`name` length must be 60 or less.',
        'string.empty': '`name` cannot be empty.',
        'any.required': '`name` is required.'
      }),
      date_of_birth: Joi.object()
        .keys({
          day: Joi.number().integer().required().messages({
            'number.base': '`date_of_birth.day` must be a number.',
            'number.integer': '`date_of_birth.day` must be an integer.',
            'any.required': '`date_of_birth.day` is required.'
          }),
          month: Joi.number().integer().required().messages({
            'number.base': '`date_of_birth.month` must be a number.',
            'number.integer': '`date_of_birth.month` must be an integer.',
            'any.required': '`date_of_birth.month` is required.'
          }),
          year: Joi.number().integer().required().messages({
            'number.base': '`date_of_birth.year` must be a number.',
            'number.integer': '`date_of_birth.year` must be an integer.',
            'any.required': '`date_of_birth.year` is required.'
          })
        })
        .required()
        .messages({
          'any.required': '`date_of_birth` is required.'
        }),
      address: Joi.string().empty().required().messages({
        'string.empty': '`address` cannot be empty.',
        'any.required': '`address` is required.'
      }),
      city: Joi.string().empty().required().messages({
        'string.empty': '`city` cannot be empty.',
        'any.required': '`city` is required.'
      }),
      country_id: Joi.number().integer().required().messages({
        'number.base': '`country_id` must be a number.',
        'number.integer': '`country_id` must be an integer.',
        'any.required': '`country_id` is required.'
      }),
      state: Joi.string().empty().required().messages({
        'string.empty': '`state` cannot be empty.',
        'any.required': '`state` is required.'
      }),
      code: Joi.string().empty().required().messages({
        'string.empty': '`code` cannot be empty.',
        'any.required': '`code` is required.'
      })
    })
    .required()
    .messages({
      'any.required': '`personal_info` is required.'
    }),
  store_info: Joi.object().keys({
    name: Joi.string().min(3).max(60).empty().required().messages({
      'string.min': '`name` length must be 3 or greater.',
      'string.max': '`name` length must be 60 or less.',
      'string.empty': '`name` cannot be empty.',
      'any.required': '`name` is required.'
    }),
    description: Joi.string().allow('').required().messages({
      'any.required': '`description` is required.'
    })
  })
});
