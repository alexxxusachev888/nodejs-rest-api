const {Contact} = require('../models/contact');
const {controlWrapper, HttpError} = require('../helpers');

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
    let {page = 1, limit = 20, favorite} = req.query;

    page = Number(page) > 0 ? Number(page) : 1;
    limit = Number(limit) > 0 ? Number(limit) : 20;

    const filter = {owner};

    if (favorite !== undefined) {
      filter.favorite = favorite === 'true';
    }

    const contacts = await Contact.find(
      filter, 
      '-createdAt -updatedAt', 
      { skip: (page - 1) * limit, limit }
    );

    res.status(200).json(contacts);
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
  const {_id: owner} = req.user;
  const newContact = await Contact.create({...req.body}, owner)
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