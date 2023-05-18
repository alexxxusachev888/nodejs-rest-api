const { Contact } = require('../models/contacts');
const controlWrapper = require('../helpers/controlWrapper');
const HttpError = require('../helpers/HttpError');

const getAllContacts = async (req, res) => {
  const getAllContacts = await Contact.find();
  res.status(200).json(getAllContacts);
}

const getContactById = async (req, res) => {
  const {id} = req.params;
  const retrievedContact = await Contact.findOne({_id: id});
  
  if (!retrievedContact) {
    throw HttpError(404, "Not found")
  }
  res.status(200).json(retrievedContact);
}

const addNewContact = async (req, res) => {
  const newContact = await Contact.create(req.body)
  res.status(201).json(newContact);
}

const updateContact = async (req, res, next) => {
  const {id} = req.params; 
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!updatedContact) {
    throw HttpError(404, "Not found")
  }
  res.status(200).json(updatedContact);
}

const updateFavorite = async (req, res, next) => {
  const {id} = req.params; 
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!updatedContact) {
    throw HttpError(404, "Not found")
  }
  res.status(200).json(updatedContact);
}

const deleteContact = async (req, res) => {
  const {id} = req.params;
  const deletedContact = await Contact.findByIdAndRemove(id);
  
  if (!deletedContact) {
    throw HttpError(404, "Not found")
  }
  res.status(200).json({message: "contact deleted"});
}

module.exports = {
  getAllContacts: controlWrapper(getAllContacts),
  getContactById: controlWrapper(getContactById),
  addNewContact: controlWrapper(addNewContact),
  updateContact: controlWrapper(updateContact),
  updateFavorite: controlWrapper(updateFavorite),
  deleteContact: controlWrapper(deleteContact),
} 