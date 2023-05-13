const HttpError = require('../helpers/HttpError');

const validateBody = schema => {
    const func = (req, res, next)=> {

        if(Object.keys(req.body).length === 0) {
          next(HttpError(400, "missing fields"));
        }

        const {error} = schema.validate(req.body);

        if(error) {
          const missingFields = error.details.map(detail => detail.context.key);
          next(HttpError(400, `Missing required ${missingFields.join(', ')} field(s)`));
        }

        next()
    }
    return func;
}

module.exports = validateBody;