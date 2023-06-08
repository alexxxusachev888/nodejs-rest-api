const authenticate = require('./authenticate.js');
const isValidId = require('./isValidId.js');
const {validateBody, validateFavorites, validateEmail} = require('./validateBody.js');
const upload = require('./upload');

module.exports = {
    authenticate,
    isValidId,
    validateBody,
    validateFavorites,
    upload,
    validateEmail
}