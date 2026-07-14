const { body, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    success: false,
    message: errors.array()[0].msg,
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
  });
};

const validateResearchRequest = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters.")
    .matches(/^[a-zA-Z0-9&.,'()\- ]+$/)
    .withMessage("Company name contains invalid characters."),
  handleValidationErrors,
];

const validateMongoId = (fieldName = "id") => [
  param(fieldName)
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid id."),
  handleValidationErrors,
];

module.exports = {
  validateResearchRequest,
  validateMongoId,
};
