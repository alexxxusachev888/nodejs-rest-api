const {Schema, model} = require('mongoose');
const Joi = require('joi');
const {handleMangooseError} = require('../helpers');

const errorMessages = (label) => ({
  'string.base': `"${label}" should be a type of 'text'`,
  'string.empty': `"${label}" cannot be an empty field`,
  'any.required': `"${label}" is a required field`
});

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String
  }, {versionKey: false, timestamps: true});

const User = model('user', userSchema);
userSchema.post('save', handleMangooseError);

const registerSchema = Joi.object({
  password: Joi.string().required().messages(errorMessages('password')),
  email: Joi.string().required().messages(errorMessages('email')),
}).options({ abortEarly: false });

const loginSchema = Joi.object({
  password: Joi.string().required().messages(errorMessages('password')),
  email: Joi.string().required().messages(errorMessages('email')),
}).options({ abortEarly: false });

const updateSubscriptionSchema = Joi.object({
subscription: Joi.string().valid('starter', 'pro', 'business').required().messages(errorMessages('subscription')),
}).options({ abortEarly: false });
  
  const schemas = {
      registerSchema,
      loginSchema,
      updateSubscriptionSchema,
  }
  
  module.exports = {
    User,
    schemas
  };