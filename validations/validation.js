const { validationResult, check } = require("express-validator");

const YourValidationName = [
    //:: Your Validation code are here
    check("field_name").notEmpty().withMessage("Your custom message"),
];

module.exports = YourValidationName;
