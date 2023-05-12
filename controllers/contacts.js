const HttpError = require('../helpers/HttpError');
const contactsManager = require('../models/contacts');
const controlWrapper = require('../helpers/controlWrapper');

const getAllContacts = async (req, res) => {
    const getAllContacts = await contactsManager.listContacts();
    res.status(200).json(getAllContacts);
}

const getContactById = async (req, res) => {
    const {id} = req.params;
    const retrievedContact = await contactsManager.getContactById(id);
    
    if (!retrievedContact) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(retrievedContact);
}

const addNewContact = async (req, res) => {
    const newContact = await contactsManager.addContact(req.body)
    res.status(201).json(newContact);
}

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const deletedContact = await contactsManager.removeContact(id);
    
    if (!deletedContact) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json({message: "contact deleted"});
}

const updateContact = async (req, res) => {
    const {id} = req.params;
    const updatedContact = await contactsManager.updateContact(id, req.body);
    
    if (!updatedContact) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(updatedContact);
}

module.exports = {
    getAllContacts: controlWrapper(getAllContacts),
    getContactById: controlWrapper(getContactById),
    addNewContact: controlWrapper(addNewContact),
    deleteContact: controlWrapper(deleteContact),
    updateContact: controlWrapper(updateContact),
}