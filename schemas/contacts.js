const Joi = require('joi');
const schemaJoi = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }).options({ abortEarly: false });


module.exports = schemaJoi;