const Joi = require("joi");

const dateOfBirthValidation = (value, helpers) => {
  console.log("Date of birth value:", value);
  const birthDate = new Date(value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  console.log("Adjusted age:", age);
  if (age < 2) {
    return helpers.error("any.invalid", {
      message: "Age must be greater than 2 years",
    });
  }
  return value;
};

const guestRegistrationSchema = Joi.object({
  firstname: Joi.string().min(3).max(50).required(),
  middlename: Joi.string().min(1).max(50).optional(),
  lastname: Joi.string().min(3).max(50).required(),
  placeofbirth: Joi.string().min(3).max(50).required(),
  dateOfBirth: Joi.date().iso().custom(dateOfBirthValidation).required(),
  fathername: Joi.string().min(3).max(50).required(),
  fatheroccupation: Joi.string().min(3).max(50).required(),
  fathernationality: Joi.string().min(3).max(50).required(),
  mothername: Joi.string().min(3).max(50).required(),
  motheroccupation: Joi.string().min(3).max(50).required(),
  mothernationality: Joi.string().min(3).max(50).required(),
  country: Joi.string().min(3).max(50).required(),
  state: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(50).required(),
  pincode: Joi.string().min(3).max(10).required(),
  address: Joi.string().min(10).max(100).required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  whatsappno: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("MALE", "FEMALE").required(),
  class: Joi.string().min(1).max(20).required()
});

const validateGuestRegistration = (data) => {
  return guestRegistrationSchema.validateAsync(data);
};


module.exports = {
  validateGuestRegistration,
};
