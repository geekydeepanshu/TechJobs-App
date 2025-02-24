import { body} from "express-validator"

export const SignUpValidation = [
 
body('firstname').notEmpty().withMessage('First name is required'),
body('lastname').notEmpty().withMessage('last name is required'),
body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
body('password')
.isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')  // Minimum length
.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')  // Uppercase letter
.matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')  // Lowercase letter
.matches(/[0-9]/).withMessage('Password must contain at least one number')  // At least one number
.matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character')  // Special character
];


// Validator for login
export const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
];