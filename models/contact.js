const {Schema, model} = require('mongoose');
const Joi = require('joi');
const {handleMangooseError} = require('../helpers')

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
});

const Contact = model('contacts', contactSchema);
contactSchema.post('save', handleMangooseError);

const contactSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).options({ abortEarly: false });

const updateFavoriteSchemaJoi = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  contactSchemaJoi,
  updateFavoriteSchemaJoi
}

module.exports = {
  Contact,
  schemas
};