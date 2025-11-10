import Joi from 'joi';
import mongoose from 'mongoose';

export const createProductSchema = Joi.object({
  title: Joi.string().required().trim().min(1).max(200).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must not exceed 200 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().optional().allow('').max(5000).messages({
    'string.max': 'Description must not exceed 5000 characters',
  }),
  price: Joi.number().required().positive().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be greater than 0',
    'any.required': 'Price is required',
  }),
  category: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.required': 'Category is required',
      'any.invalid': 'Category must be a valid ObjectId',
    }),
  stock: Joi.number().optional().min(0).default(0).messages({
    'number.base': 'Stock must be a number',
    'number.min': 'Stock must be greater than or equal to 0',
  }),
  tags: Joi.array().optional().items(Joi.string().trim()).default([]),
  images: Joi.array()
    .optional()
    .items(Joi.string().uri().trim())
    .default([])
    .messages({
      'array.includes': 'All images must be valid URLs',
    }),
});

