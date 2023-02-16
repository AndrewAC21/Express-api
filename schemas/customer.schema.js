const Joi = require('joi');

const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phoneNumber = Joi.number().integer();
const idNumber = Joi.number().integer();
const userId = Joi.number().integer();

const email = Joi.string().email();
const password = Joi.string().min(8);

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phoneNumber: phoneNumber.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phoneNumber: phoneNumber,
  userId: userId,
});

const getCustomerSchema = Joi.object({
  id: idNumber.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
