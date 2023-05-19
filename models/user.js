const {Schema, model} = require('mongoose');
const Joi = require('joi');
const handleMangooseError = require('../helpers/handleMangooseError');

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

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
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
}).options({ abortEarly: false });

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
  }).options({ abortEarly: false });

const schemas = {
    registerSchema,
    loginSchema
}

module.exports = {
  User,
  schemas
};