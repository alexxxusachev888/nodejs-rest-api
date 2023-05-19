const authenticate = require('./authenticate.js');
const isValidId = require('./isValidId.js');
const {validateBody, validateFavorites} = require('./validateBody.js')

module.exports = {
    authenticate,
    isValidId,
    validateBody,
    validateFavorites
}