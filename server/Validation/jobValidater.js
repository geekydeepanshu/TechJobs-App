import { body } from 'express-validator';

export const JobValidation = [
  body('title')
    .notEmpty().withMessage('Please provide a title')
    .trim(),

  body('description')
    .notEmpty().withMessage('Please provide a description')
    .trim(),

  body('category')
    .notEmpty().withMessage('Please provide a category')
    .trim(), 

  body('salary')
    .isNumeric().withMessage('Salary must be a valid number')
    .custom(value => value > 0).withMessage('Salary must be greater than 0'),

  body('location')
    .notEmpty().withMessage('Please provide a location')
    .trim(), 

  body('level')
    .isIn(['junior', 'mid', 'senior']).withMessage('Level must be one of the following: junior, mid, senior')
    .notEmpty().withMessage('Please provide a level')
]