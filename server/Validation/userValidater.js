import { body} from "express-validator"

export const SignUpValidation = [
 
body('firstname').notEmpty().withMessage('Please provide your first name'),
body('lastname').notEmpty().withMessage('Please provide your last name'),
body('email').isEmail().withMessage('A valid email address is required').normalizeEmail(),
body('password')
.isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') 
.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')  
.matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')  
.matches(/[0-9]/).withMessage('Password must contain at least one number')  
.matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character'),
];


// Validator for login
export const loginValidation = [
    body('email').isEmail().withMessage('A valid email address is required'),
];