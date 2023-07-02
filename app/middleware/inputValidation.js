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

// import { validationResult } from "express-validator";
// import cloudinary from "cloudinary";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: "your_cloud_name",
//   api_key: "your_api_key",
//   api_secret: "your_api_secret",
// });

// Middleware for validating with formdata request input
// const validateInput = (req, res, next) => {
//   const contentType = req.headers["content-type"];

//   if (contentType && contentType.includes("multipart/form-data")) {
//     // Handle form data validation with Cloudinary
//     const files = Object.values(req.files || {});

//     if (files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     // Example: Check if the required fields are present
//     const requiredFields = ["field1", "field2"];
//     const missingFields = requiredFields.filter((field) => !req.body[field]);

//     if (missingFields.length > 0) {
//       return res.status(422).json({ error: "Missing fields: " + missingFields.join(", ") });
//     }

//     // Example: Validate file types and sizes
//     const invalidFiles = files.filter((file) => {
//       const allowedTypes = ["image/jpeg", "image/png"];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       return !allowedTypes.includes(file.mimetype) || file.size > maxSize;
//     });

//     if (invalidFiles.length > 0) {
//       return res.status(422).json({ error: "Invalid files" });
//     }

//     // Perform additional form data validation if needed

//     next();
//   } else {
//     // Handle JSON data validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const errorMessages = errors.array().map((error) => error.msg);
//       return res.status(422).json({ error: errorMessages });
//     }

//     next();
//   }
// };

// export default validateInput;
