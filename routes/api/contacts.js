const express = require('express');
const router = express.Router();

const controls = require('../../controllers/contacts');
const schema = require('../../schemas/contacts');
const validate = require('../../middlewares/validateBody');

router.get('/', controls.getAllContacts)

router.get('/:id', controls.getContactById)

router.post('/', validate(schema), controls.addNewContact)

router.delete('/:id', controls.deleteContact)

router.put('/:id', validate(schema), controls.updateContact)

module.exports = router
