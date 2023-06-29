import {validationResult} from "express-validator"

// Middleware for validating request input
const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(422).json({ error: errorMessages });
  }
  next();
};


export default validateInput