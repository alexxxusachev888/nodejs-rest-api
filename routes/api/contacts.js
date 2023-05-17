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
  
const { schemas: {contactSchemaJoi, updateFavoriteSchemaJoi} } = require('../../models/contacts');
const isValidId = require('../../middlewares/isValidId')
const {validateBody, validateFavorites} = require('../../middlewares/validateBody');

router.get('/', getAllContacts);

router.get('/:id', isValidId, getContactById);

router.post('/', validateBody(contactSchemaJoi), addNewContact);

router.delete('/:id', isValidId, deleteContact);

router.put('/:id', isValidId, validateBody(contactSchemaJoi), updateContact) ;

router.patch('/:id/favorite', isValidId, validateFavorites(updateFavoriteSchemaJoi), updateFavorite);

module.exports = router;
