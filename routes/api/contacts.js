const express = require('express');
const router = express.Router();

const {
    getAllContacts,
    getContactById,
    addNewContact,
    updateContact,
    updateFavorite,
    deleteContact
  } = require('../../controllers/contacts');
  
const { schemas: {contactSchemaJoi, updateFavoriteSchemaJoi} } = require('../../models/contact');
const {validateBody, validateFavorites, isValidId, authenticate} = require('../../middlewares');

router.get('/', authenticate, getAllContacts);

router.get('/:id', authenticate, isValidId, getContactById);

router.post('/', authenticate, validateBody(contactSchemaJoi), addNewContact);

router.delete('/:id', authenticate, isValidId, deleteContact);

router.put('/:id', authenticate, isValidId, validateBody(contactSchemaJoi), updateContact) ;

router.patch('/:id/favorite', authenticate, isValidId, validateFavorites(updateFavoriteSchemaJoi), updateFavorite);

module.exports = router;
