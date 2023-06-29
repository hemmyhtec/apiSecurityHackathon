import {validationResult} from "express-validator"

// Middleware for validating request input
 const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

export default validateInput